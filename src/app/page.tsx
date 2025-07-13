"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Cake, Coffee, Heart, Star, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook, Award, Users, ChefHat, Quote } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    nama: "",
    nomorWA: "",
    catatan: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.nomorWA) {
      alert("Nama dan Nomor WhatsApp harus diisi.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: formData.nama,
          nomorWA: formData.nomorWA,
          catatan: formData.catatan || "Saya ingin memesan kue dari toko Anda.",
          timestamp: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ Order submitted successfully:', result);

      // Jika berhasil, baru redirect ke WhatsApp
      // const message = `Halo, saya ${formData.nama}. ${formData.catatan || "Saya ingin memesan kue dari toko Anda."}\n\nOrder ID: ${result.orderId}`;
      // const whatsappUrl = `https://wa.me/6285183241832?text=${encodeURIComponent(message)}`;
      
      // Reset form setelah berhasil
      setFormData({
        nama: "",
        nomorWA: "",
        catatan: ""
      });

      // Tampilkan notifikasi sukses dengan Order ID
      alert(`Pesanan berhasil dikirim!\nOrder ID: ${result.orderId}\n\nAnda akan diarahkan ke WhatsApp.`);
      
      // Buka WhatsApp
      // window.open(whatsappUrl, '_blank');

    } catch (error) {
      console.error('❌ Error submitting order:', error);
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.";
      alert(`Terjadi kesalahan saat mengirim pesanan: ${errorMessage}\n\nSilakan coba lagi.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const menuItems = [
    { name: "Croissant Butter", price: "Rp 25.000", image: "🥐", description: "Croissant klasik dengan butter premium", rating: 4.8 },
    { name: "Chocolate Cake", price: "Rp 150.000", image: "🍰", description: "Kue cokelat lembut dengan lapisan ganache", rating: 4.9 },
    { name: "Red Velvet Cake", price: "Rp 180.000", image: "🎂", description: "Kue red velvet dengan cream cheese frosting", rating: 4.7 },
    { name: "Blueberry Muffin", price: "Rp 35.000", image: "🧁", description: "Muffin lembut dengan blueberry segar", rating: 4.6 },
    { name: "Artisan Bread", price: "Rp 45.000", image: "🍞", description: "Roti artisan dengan bahan berkualitas tinggi", rating: 4.8 },
    { name: "Cheesecake", price: "Rp 120.000", image: "🍰", description: "Cheesecake New York style yang creamy", rating: 4.9 }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Pelanggan Setia",
      content: "Kue-kue di Artisan Bakery selalu segar dan lezat! Sudah 3 tahun jadi langganan dan tidak pernah mengecewakan.",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Event Organizer",
      content: "Untuk acara perusahaan, kami selalu memesan kue dari sini. Kualitas dan pelayanannya luar biasa!",
      rating: 5
    },
    {
      name: "Maya Sari",
      role: "Ibu Rumah Tangga",
      content: "Anak-anak saya sangat suka croissant dan muffin dari sini. Rasanya autentik dan tidak terlalu manis.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Tahun Berpengalaman", value: "14+", icon: Award },
    { label: "Pelanggan Puas", value: "5000+", icon: Users },
    { label: "Varian Kue", value: "50+", icon: Cake },
    { label: "Chef Berpengalaman", value: "8+", icon: ChefHat }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative">
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse cursor-pointer"
          onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-amber-300/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-amber-400/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-orange-200/20 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative inline-block">
              <Cake className="w-16 h-16 mx-auto mb-4 text-amber-600 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-amber-900 mb-6 animate-fade-in">
              Artisan Bakery
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-2xl mx-auto leading-relaxed">
              Kue segar yang dipanggang dengan cinta setiap hari. Rasakan kelezatan autentik dalam setiap gigitan.
            </p>
            <div className="flex gap-4 justify-center items-center text-amber-700 mb-8 flex-wrap">
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>Buka 07:00 - 21:00</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 cursor-pointer transition-all duration-300 hover:shadow-2xl"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Pesan Sekarang
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-6 text-lg rounded-full shadow-lg transform hover:scale-105 cursor-pointer transition-all duration-300 bg-white/50 backdrop-blur-sm"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Lihat Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-amber-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-amber-300" />
                <div className="text-3xl font-bold text-amber-200 mb-1">{stat.value}</div>
                <div className="text-sm text-amber-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Tentang Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sejak 2010, kami telah menghadirkan kue-kue berkualitas tinggi dengan bahan-bahan terbaik dan resep tradisional yang telah diwariskan turun temurun.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 border-amber-200 hover:border-amber-400 transition-colors">
              <CardHeader>
                <Heart className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <CardTitle className="text-xl text-amber-900">Dibuat dengan Cinta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Setiap kue dibuat dengan penuh perhatian dan cinta untuk memberikan pengalaman terbaik bagi pelanggan.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-amber-200 hover:border-amber-400 transition-colors">
              <CardHeader>
                <Star className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <CardTitle className="text-xl text-amber-900">Bahan Berkualitas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Kami hanya menggunakan bahan-bahan premium dan segar untuk menghasilkan cita rasa yang luar biasa.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-amber-200 hover:border-amber-400 transition-colors">
              <CardHeader>
                <Coffee className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <CardTitle className="text-xl text-amber-900">Resep Tradisional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Menggunakan resep yang telah teruji waktu dan dikombinasikan dengan teknik modern untuk hasil sempurna.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-100 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Menu Spesial Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilihan kue terbaik yang dibuat fresh setiap hari dengan resep rahasia keluarga.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white border-2 border-amber-200 hover:border-amber-400 overflow-hidden">
                <CardHeader className="text-center relative">
                  <div className="absolute top-4 right-4 bg-amber-100 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="text-sm text-amber-700 font-medium">{item.rating}</span>
                  </div>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 relative">
                    {item.image}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </div>
                  <CardTitle className="text-xl text-amber-900 group-hover:text-amber-700 transition-colors">{item.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-amber-600 mb-4">{item.price}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Kata Pelanggan Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan langsung dari pelanggan yang telah merasakan kelezatan kue-kue kami.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-amber-50">
                <CardContent className="text-center">
                  <Quote className="w-8 h-8 mx-auto mb-4 text-amber-600" />
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  <div className="border-t border-amber-200 pt-4">
                    <p className="font-semibold text-amber-900">{testimonial.name}</p>
                    <p className="text-sm text-amber-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Hubungi Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Siap memesan kue impian Anda? Isi form di bawah dan kami akan menghubungi Anda segera!
            </p>
          </div>
          
          <Card className="p-8 border-2 border-amber-200 shadow-2xl bg-white/80 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nama" className="block text-sm font-medium text-amber-900 mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    id="nama"
                    name="nama"
                    type="text"
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                
                <div>
                  <label htmlFor="nomorWA" className="block text-sm font-medium text-amber-900 mb-2">
                    Nomor WhatsApp
                  </label>
                  <Input
                    id="nomorWA"
                    name="nomorWA"
                    type="tel"
                    value={formData.nomorWA}
                    onChange={handleInputChange}
                    required
                    className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                    placeholder="Contoh: 08123456789"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="catatan" className="block text-sm font-medium text-amber-900 mb-2">
                  Catatan Pesanan
                </label>
                <Textarea
                  id="catatan"
                  name="catatan"
                  value={formData.catatan}
                  onChange={handleInputChange}
                  rows={4}
                  className="border-amber-300 focus:border-amber-500 focus:ring-amber-500 transition-all duration-300"
                  placeholder="Ceritakan tentang kue yang Anda inginkan, ukuran, tanggal pengambilan, atau permintaan khusus lainnya..."
                />
              </div>
              
              <Button 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-6 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-2xl cursor-pointer disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Mengirim Pesanan...
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    Hubungi Kami
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Cake className="w-8 h-8 text-amber-300" />
                <h3 className="text-2xl font-bold text-amber-300">Artisan Bakery</h3>
              </div>
              <p className="text-amber-200 mb-4 leading-relaxed">
                Kue segar yang dipanggang dengan cinta setiap hari. Rasakan pengalaman kuliner yang tak terlupakan bersama kami.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open('https://instagram.com/artisanbakery', '_blank')}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open('https://facebook.com/artisanbakery', '_blank')}
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-amber-900 transition-all duration-300 cursor-pointer"
                  onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-amber-300 mb-4">Jam Operasional</h4>
              <div className="space-y-2 text-amber-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Senin - Jumat: 07:00 - 21:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Sabtu - Minggu: 08:00 - 22:00</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-amber-300 mb-4">Lokasi</h4>
              <div className="space-y-2 text-amber-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Jl. Raya Bakery No. 123</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Jakarta Selatan, 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+62 812-3456-7890</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-amber-800 pt-6 text-center">
            <p className="text-amber-300 text-sm">
              © 2024 Artisan Bakery. Dibuat dengan ❤️ untuk pelanggan terbaik kami. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
