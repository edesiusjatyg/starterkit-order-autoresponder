import { NextRequest, NextResponse } from 'next/server';

interface OrderData {
  nama: string;
  nomorWA: string;
  catatan: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: OrderData = await request.json();
    
    // Validasi data yang diterima
    if (!data.nama || !data.nomorWA) {
      return NextResponse.json(
        { error: 'Nama dan nomor WhatsApp harus diisi' }, 
        { status: 400 }
      );
    }

    // Log data pesanan untuk monitoring
    console.log('📋 New Order Received:', {
      nama: data.nama,
      nomorWA: data.nomorWA,
      catatan: data.catatan,
      timestamp: data.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || 'unknown'
    });

    // Di sini Anda bisa menambahkan logika untuk:
    // - Menyimpan ke database
    // - Mengirim notifikasi ke admin
    // - Integrasi dengan sistem lain
    // - Validasi nomor WhatsApp
    
    // Generate order ID untuk tracking
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

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