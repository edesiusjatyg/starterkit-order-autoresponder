import { NextRequest, NextResponse } from 'next/server';

interface OrderData {
  nama: string;
  nomorWA: string;
  catatan: string;
  timestamp: string;
}
const orderCounters = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const data: OrderData = await request.json();
    
    if (!data.nama || !data.nomorWA) {
      return NextResponse.json(
        { error: 'Nama dan nomor WhatsApp harus diisi' }, 
        { status: 400 }
      );
    }

    console.log('📋 New Order Received:', {
      nama: data.nama,
      nomorWA: data.nomorWA,
      catatan: data.catatan,
      timestamp: data.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown'
    });

    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    const dateKey = `${year}${month}${day}`;
    const currentCount = orderCounters.get(dateKey) || 0;
    const newCount = currentCount + 1;
    orderCounters.set(dateKey, newCount);
    
    const sequentialNum = newCount.toString().padStart(3, '0');
    
    const orderId = `ORD-${year}${month}${day}-${sequentialNum}`;

    const environment = process.env.ENVIRONMENT
    var webhookUrl = '';
    if( environment === 'development' ) {
      webhookUrl = process.env.DEVELOPMENT_WEBHOOK_URL ?? '';
    } else {
      webhookUrl = process.env.PRODUCTION_WEBHOOK_URL ?? '';
    }

    try {
      const webhookPayload = {
        orderId: orderId,
        nama: data.nama,
        nomorWA: data.nomorWA,
        catatan: data.catatan,
        timestamp: data.timestamp,
        source: 'artisan-bakery-website',
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown'
      };

      console.log('🔄 Sending data to webhook:', webhookUrl);
      
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      });

      if (webhookResponse.ok) {
        console.log('✅ Webhook sent successfully');
      } else {
        console.warn(`⚠️ Webhook failed with status: ${webhookResponse.status}`);
      }
    } catch (webhookError) {
      console.error('❌ Error sending webhook:', webhookError);
    }

    const responseData = {
      success: true,
      message: 'Pesanan berhasil diterima',
      orderId: orderId,
      data: {
        nama: data.nama,
        nomorWA: data.nomorWA,
        catatan: data.catatan,
        timestamp: data.timestamp
      }
    };

    console.log('✅ Order processed successfully:', orderId);

    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('❌ Error processing order:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Terjadi kesalahan server. Silakan coba lagi.' 
      }, 
      { status: 500 }
    );
  }
}