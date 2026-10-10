"use client";

import React from "react";
import { ArrowLeft, MapPin, Plus, Trash2, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SavedAddressesPage() {
  const router = useRouter();

  const dummyAddresses = [
    {
      id: 1,
      type: "Home",
      name: "Amina Spices",
      address: "123, Gandhi Road, Kochi",
      city: "Kerala",
      pincode: "682001",
      phone: "+91 98765 43210",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      name: "Amina Storefront",
      address: "45/A, Market Street, Ernakulam",
      city: "Kerala",
      pincode: "682031",
      phone: "+91 91234 56789",
      isDefault: false
    }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">Saved Addresses</h1>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dummyAddresses.map((addr) => (
          <div key={addr.id} className="bg-background rounded-2xl p-6 shadow-sm border border-border/50 relative">
            {addr.isDefault && (
              <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">Default</span>
            )}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-bold">{addr.type}</h3>
            </div>
            <p className="font-medium text-sm mb-1">{addr.name}</p>
            <p className="text-sm text-muted-foreground mb-1">{addr.address}</p>
            <p className="text-sm text-muted-foreground mb-3">{addr.city} - {addr.pincode}</p>
            <p className="text-sm font-medium mb-4">{addr.phone}</p>
            
            <div className="flex gap-2 pt-4 border-t border-border/50">
              <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-lg hover:bg-muted transition-colors">
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-red-500 py-2 rounded-lg hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
