"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cake, CheckCircle, MessageCircle, Home, Clock, Phone } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState<{
    orderId: string;
    nama: string;
    nomorWA: string;
    catatan: string;
  } | null>(null);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const nama = searchParams.get('nama');
    const nomorWA = searchParams.get('nomorWA');
    const catatan = searchParams.get('catatan');

    if (orderId && nama && nomorWA) {
      setOrderData({
        orderId,
        nama,
        nomorWA,
        catatan: catatan || "Saya ingin memesan kue dari toko Anda."
      });
    } else {
      // Jika tidak ada data yang valid, redirect ke home
      router.push('/');
    }
  }, [searchParams, router]);

  const handleWhatsAppContact = () => {
    if (orderData) {
      const message = `Halo, saya ${orderData.nama}. ${orderData.catatan}\n\nOrder ID: ${orderData.orderId}`;
      const whatsappUrl = `https://wa.me/6285183241832?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-amber-300/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-amber-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-orange-200/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 mt-8 animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full animate-ping"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 animate-fade-in">
              Pesanan Berhasil!
            </h1>
            
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              Terima kasih {orderData.nama}, pesanan Anda telah kami terima dengan baik!
            </p>
          </div>

          {/* Order Details Card */}
          <Card className="p-8 border-2 border-amber-200 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Cake className="w-8 h-8 text-amber-600" />
                <CardTitle className="text-2xl text-amber-900">Detail Pesanan</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Order ID</h3>
                  <div className="text-2xl font-bold text-amber-600 bg-white px-4 py-2 rounded-lg border border-amber-300">
                    {orderData.orderId}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Nama Pemesan:</h4>
                  <p className="text-gray-700 bg-amber-50 p-3 rounded-lg">{orderData.nama}</p>
                </div>
                
                <div className="text-left">
                  <h4 className="font-semibold text-amber-900 mb-2">Nomor WhatsApp:</h4>
                  <p className="text-gray-700 bg-amber-50 p-3 rounded-lg">{orderData.nomorWA}</p>
                </div>
              </div>

              <div className="text-left">
                <h4 className="font-semibold text-amber-900 mb-2">Catatan Pesanan:</h4>
                <p className="text-gray-700 bg-amber-50 p-4 rounded-lg leading-relaxed">
                  {orderData.catatan}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Section */}
          <Card className="p-6 border-2 border-green-200 bg-green-50/80 backdrop-blur-sm mb-8">
            <CardContent>
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                Langkah Selanjutnya
              </h3>
              <div className="space-y-3 text-green-700">
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Tim kami akan memproses pesanan Anda
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Kami akan menghubungi Anda via WhatsApp untuk konfirmasi
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Pembayaran dan pengambilan akan dikoordinasikan
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl flex items-center gap-2 cursor-pointer"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi via WhatsApp
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm flex items-center gap-2 cursor-pointer"
              onClick={handleBackToHome}
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 mb-8 text-center">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-amber-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-amber-900">Butuh Bantuan?</h4>
              </div>
              <p className="text-amber-800 text-sm">
                Jika ada pertanyaan atau perubahan pesanan, silakan hubungi kami di 
                <br />
                <strong>+62 812-3456-7890</strong> atau melalui WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
