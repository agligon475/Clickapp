/**
 * =====================================================================
 * DALE!TEPIDO 🤝 DALE!QUEVOY — CLIENTE LOGÍSTICO NATIVO DEL NAVEGADOR
 * Gestión de Despacho Multimodal, Validación PIN y Supabase Realtime
 * =====================================================================
 */

(function(window) {
  'use strict';

  const DALE_SHARED_SUPABASE_URL = 'https://ppqfvnexetuwldovpjlq.supabase.co';
  const DALE_SHARED_ANON_KEY = 
    window.VITE_SUPABASE_ANON_KEY || 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcWZ2bmV4ZXR1d2xkb3ZwamxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NzkyMTgsImV4cCI6MjEwODM1NTIxOH0.lnhRsdY0oAZdFdymNZQLHElZ7tqW0EWEJV4oimuSkUM';

  const BUSINESS_TYPES = {
    GASTRONOMY: 'GASTRONOMY',
    PHARMACY: 'PHARMACY',
    ECOMMERCE: 'ECOMMERCE',
    GROCERY: 'GROCERY',
    RETAIL: 'RETAIL',
    HARDWARE: 'HARDWARE',
    PETSHOP: 'PETSHOP',
    BOOKSTORE: 'BOOKSTORE',
    ELECTRONICS: 'ELECTRONICS',
    OTHER: 'OTHER'
  };

  function normalizeBusinessType(typeOrRubro) {
    if (!typeOrRubro) return 'OTHER';
    const norm = String(typeOrRubro).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (norm.includes('FARMAC') || norm.includes('SALUD') || norm.includes('MEDIC')) return 'PHARMACY';
    if (norm.includes('FERRET') || norm.includes('CORRAL') || norm.includes('PINTUR') || norm.includes('CONSTRUC')) return 'HARDWARE';
    if (norm.includes('PET') || norm.includes('VETERINAR') || norm.includes('MASCOT')) return 'PETSHOP';
    if (norm.includes('ROPA') || norm.includes('INDUMENT') || norm.includes('CALZAD') || norm.includes('MODA') || norm.includes('RETAIL')) return 'RETAIL';
    if (norm.includes('GASTRO') || norm.includes('COMID') || norm.includes('REST') || norm.includes('ROTIS') || norm.includes('CAFE') || norm.includes('BAR')) return 'GASTRONOMY';
    if (norm.includes('ALMAC') || norm.includes('KIOS') || norm.includes('VERDUL') || norm.includes('SUPER') || norm.includes('FIAMB')) return 'GROCERY';
    if (norm.includes('LIBRO') || norm.includes('LIBRER') || norm.includes('JUGUET')) return 'BOOKSTORE';
    if (norm.includes('ELEC') || norm.includes('COMPUT') || norm.includes('CELUL') || norm.includes('TECNOL')) return 'ELECTRONICS';
    if (norm.includes('ECOM') || norm.includes('ONLINE') || norm.includes('TIENDA')) return 'ECOMMERCE';
    return 'OTHER';
  }

  function generateSecurityPin() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  function calculateOrderMetrics(items, businessType) {
    const normType = normalizeBusinessType(businessType);
    let totalWeightKg = 0;
    
    (items || []).forEach(item => {
      const qty = Number(item.cantidad || item.qty || item.count || 1);
      const weight = Number(item.weight_kg !== undefined ? item.weight_kg : (item.peso_kg || 0.5));
      totalWeightKg += (weight * qty);
    });

    totalWeightKg = Math.round(totalWeightKg * 100) / 100;
    if (totalWeightKg <= 0) totalWeightKg = 0.5;

    let resolvedCategory = 'SMALL_BOX';
    if (normType === 'PHARMACY') {
      resolvedCategory = 'PHARMACY';
    } else if (normType === 'PETSHOP') {
      resolvedCategory = 'PETSHOP';
    } else if (normType === 'RETAIL') {
      resolvedCategory = 'RETAIL';
    } else if (normType === 'GASTRONOMY') {
      resolvedCategory = 'FOOD';
    } else if (normType === 'HARDWARE' || totalWeightKg > 15.0) {
      resolvedCategory = 'LARGE_CARGO';
    } else {
      resolvedCategory = 'SMALL_BOX';
    }

    let suggestedVehicle = 'MOTO / BICI';
    let suggestedVehicleIcon = '🛵';
    let vehicleDescription = 'Repartidor ágil en moto o bicicleta para paquetes ligeros.';

    if (resolvedCategory === 'LARGE_CARGO' || totalWeightKg > 15.0) {
      suggestedVehicle = 'CAMIONETA / UTILITARIO';
      suggestedVehicleIcon = '🚐';
      vehicleDescription = 'Transporte utilitario de carga (Van/Flete) para bultos pesados o ferretería.';
    } else if (totalWeightKg > 5.0 || resolvedCategory === 'PETSHOP' || normType === 'ECOMMERCE') {
      suggestedVehicle = 'AUTO';
      suggestedVehicleIcon = '🚗';
      vehicleDescription = 'Vehículo de 4 ruedas para compras con volumen moderado o múltiples paquetes.';
    }

    return {
      totalWeightKg,
      resolvedCategory,
      suggestedVehicle,
      suggestedVehicleIcon,
      vehicleDescription,
      businessType: normType
    };
  }

  function getSharedSupabaseClient() {
    if (window._daleSharedSupabase) return window._daleSharedSupabase;
    if (typeof window.supabase !== 'undefined' && typeof window.supabase.createClient === 'function') {
      window._daleSharedSupabase = window.supabase.createClient(DALE_SHARED_SUPABASE_URL, DALE_SHARED_ANON_KEY);
      return window._daleSharedSupabase;
    }
    return null;
  }

  async function despacharEnvioDaleQueVoy({ order, merchant, businessType }) {
    const bType = businessType || merchant?.business_type || merchant?.rubro || 'OTHER';
    let items = [];
    if (Array.isArray(order.items)) {
      items = order.items;
    } else if (typeof order.detalle === 'string') {
      try {
        const parsed = JSON.parse(order.detalle);
        if (Array.isArray(parsed)) items = parsed;
      } catch(e) {}
    }

    const { totalWeightKg, resolvedCategory, suggestedVehicle } = calculateOrderMetrics(items, bType);
    const pinCode = order.pin_code || generateSecurityPin();

    const resumenItems = items.length > 0
      ? items.map(i => `${i.nombre || i.name} ×${i.cantidad || i.qty || 1}`).join(', ')
      : (order.productos || order.description || 'Paquete comercial');

    const deliveryPayload = {
      id: order.delivery_id || crypto.randomUUID(),
      origin_app: 'TEPIDO',
      requester_id: order.merchant_id || merchant.id || crypto.randomUUID(),
      title: `${merchant.name || 'Comercio'} — #${order.order_number || order.id || 'PEDIDO'}`,
      description: `${resumenItems} (Peso aprox: ${totalWeightKg} kg) [${suggestedVehicle}]`,
      category: resolvedCategory,
      weight_kg: totalWeightKg,
      origin_address: merchant.address || 'Local Comercial',
      origin_lat: merchant.lat ? Number(merchant.lat) : -34.6037,
      origin_lng: merchant.lng ? Number(merchant.lng) : -58.3816,
      destination_address: order.delivery_address || order.direccion || 'Domicilio del Cliente',
      destination_lat: order.delivery_lat ? Number(order.delivery_lat) : -34.6080,
      destination_lng: order.delivery_lng ? Number(order.delivery_lng) : -58.3850,
      offered_price_ars: Number(order.delivery_fee_ars || order.costo_envio || 0),
      est_distance_km: Number(order.est_distance_km || 3.5),
      pin_code: pinCode,
      status: 'SEARCHING',
      customer_phone: order.customer_phone || order.telefono || order.cliente_telefono || ''
    };

    const sbClient = getSharedSupabaseClient();
    if (sbClient) {
      const { data, error } = await sbClient
        .from('deliveries')
        .insert(deliveryPayload)
        .select()
        .single();

      if (error) throw error;
      return {
        delivery: data,
        deliveryId: data.id,
        pinCode,
        totalWeightKg,
        resolvedCategory,
        suggestedVehicle
      };
    }

    // Fallback nativo directo a REST si no está cargado @supabase/supabase-js
    const res = await fetch(`${DALE_SHARED_SUPABASE_URL}/rest/v1/deliveries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': DALE_SHARED_ANON_KEY,
        'Authorization': `Bearer ${DALE_SHARED_ANON_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(deliveryPayload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Error en despacho a Dale!QueVoy (${res.status}): ${errText}`);
    }

    const insertedRows = await res.json();
    const data = Array.isArray(insertedRows) ? insertedRows[0] : insertedRows;

    return {
      delivery: data,
      deliveryId: data.id,
      pinCode,
      totalWeightKg,
      resolvedCategory,
      suggestedVehicle
    };
  }

  function escucharEstadoCadete(deliveryId, onUpdate) {
    if (!deliveryId) return () => {};

    const sbClient = getSharedSupabaseClient();
    if (sbClient) {
      const channel = sbClient
        .channel(`pickup_${deliveryId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'deliveries',
            filter: `id=eq.${deliveryId}`
          },
          payload => {
            if (typeof onUpdate === 'function') onUpdate(payload.new);
          }
        )
        .subscribe();

      return () => {
        sbClient.removeChannel(channel);
      };
    }

    // Fallback con polling inteligente cada 4 segundos
    let isActive = true;
    const intervalId = setInterval(async () => {
      if (!isActive) return;
      try {
        const res = await fetch(`${DALE_SHARED_SUPABASE_URL}/rest/v1/deliveries?id=eq.${encodeURIComponent(deliveryId)}&select=*`, {
          headers: {
            'apikey': DALE_SHARED_ANON_KEY,
            'Authorization': `Bearer ${DALE_SHARED_ANON_KEY}`
          }
        });
        if (res.ok) {
          const rows = await res.json();
          if (rows && rows.length > 0 && typeof onUpdate === 'function') {
            onUpdate(rows[0]);
          }
        }
      } catch(e) {}
    }, 4000);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }

  // Interfaz pública
  window.DaleLogistics = {
    SHARED_SUPABASE_URL: DALE_SHARED_SUPABASE_URL,
    SHARED_ANON_KEY: DALE_SHARED_ANON_KEY,
    BUSINESS_TYPES,
    normalizeBusinessType,
    generateSecurityPin,
    calculateOrderMetrics,
    despacharEnvioDaleQueVoy,
    escucharEstadoCadete,
    getSharedSupabaseClient
  };

})(typeof window !== 'undefined' ? window : globalThis);
