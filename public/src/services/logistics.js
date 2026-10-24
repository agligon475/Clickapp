/**
 * =====================================================================
 * Dale!TePido 🤝 Dale!QueVoy — Módulo de Despacho Logístico Multimodal
 * Ecosistema Universal Multi-Rubro & Supabase Realtime
 * =====================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase Compartido
const SUPABASE_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_URL) ||
  (typeof window !== 'undefined' && window.VITE_SUPABASE_URL) ||
  'https://ppqfvnexetuwldovpjlq.supabase.co';

const SUPABASE_ANON_KEY = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_SUPABASE_ANON_KEY) ||
  (typeof window !== 'undefined' && window.VITE_SUPABASE_ANON_KEY) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcWZ2bmV4ZXR1d2xkb3ZwamxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NzkyMTgsImV4cCI6MjEwODM1NTIxOH0.lnhRsdY0oAZdFdymNZQLHElZ7tqW0EWEJV4oimuSkUM';

export const supabaseLogistics = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Rubros soportados por Dale!TePido
 */
export const BUSINESS_TYPES = {
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

/**
 * Normaliza un rubro de texto a business_type estándar
 */
export function normalizeBusinessType(typeOrRubro) {
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

/**
 * Genera un código PIN de seguridad de 4 dígitos para validación de entrega en destino
 */
export function generateSecurityPin() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Calcula el peso total de la orden sumando (weight_kg × cantidad) y resuelve la categoría de transporte
 * @param {Array} items - Lista de productos de la orden con weight_kg y cantidad
 * @param {string} businessType - Rubro del comercio
 */
export function calculateOrderMetrics(items = [], businessType = 'OTHER') {
  const normType = normalizeBusinessType(businessType);
  
  let totalWeightKg = 0;
  items.forEach(item => {
    const qty = Number(item.cantidad || item.qty || item.count || 1);
    const weight = Number(item.weight_kg !== undefined ? item.weight_kg : (item.peso_kg || 0.5));
    totalWeightKg += (weight * qty);
  });

  // Redondear a 2 decimales
  totalWeightKg = Math.round(totalWeightKg * 100) / 100;
  if (totalWeightKg <= 0) totalWeightKg = 0.5;

  // Resolución de categoría de transporte
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

  // Recomendación de vehículo en Dale!QueVoy
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

/**
 * Despacha un pedido multimodal hacia Dale!QueVoy insertándolo en public.deliveries
 * @param {Object} params
 * @param {Object} params.order - Datos de la comanda en Dale!TePido
 * @param {Object} params.merchant - Datos del comercio de retiro
 * @param {string} [params.businessType] - Tipo de comercio
 */
export async function despacharEnvioDaleQueVoy({ order, merchant, businessType }) {
  const bType = businessType || merchant?.business_type || merchant?.rubro || 'OTHER';
  const items = Array.isArray(order.items) ? order.items : [];
  
  const { totalWeightKg, resolvedCategory, suggestedVehicle } = calculateOrderMetrics(items, bType);
  const pinCode = order.pin_code || generateSecurityPin();

  // Resumen de ítems para el chofer de Dale!QueVoy
  const resumenItems = items.length > 0
    ? items.map(i => `${i.nombre || i.name} ×${i.cantidad || i.qty || 1}`).join(', ')
    : (order.resumen_productos || order.description || 'Paquete comercial');

  const deliveryPayload = {
    id: order.delivery_id || crypto.randomUUID(),
    origin_app: 'TEPIDO',
    requester_id: order.merchant_id || merchant.id || crypto.randomUUID(),
    title: `${merchant.name || 'Comercio'} — #${order.order_number || order.id || 'PEDIDO'}`,
    description: `${resumenItems} (Peso aprox: ${totalWeightKg} kg) [Vehículo sugerido: ${suggestedVehicle}]`,
    category: resolvedCategory,
    weight_kg: totalWeightKg,
    origin_address: merchant.address || 'Local Comercial',
    origin_lat: merchant.lat ? Number(merchant.lat) : -34.6037,
    origin_lng: merchant.lng ? Number(merchant.lng) : -58.3816,
    destination_address: order.delivery_address || order.direccion || 'Domicilio Cliente',
    destination_lat: order.delivery_lat ? Number(order.delivery_lat) : -34.6080,
    destination_lng: order.delivery_lng ? Number(order.delivery_lng) : -58.3850,
    offered_price_ars: Number(order.delivery_fee_ars || order.costo_envio || 0),
    est_distance_km: Number(order.est_distance_km || 3.5),
    pin_code: pinCode,
    status: 'SEARCHING',
    customer_phone: order.customer_phone || order.telefono || order.cliente_telefono || ''
  };

  const { data, error } = await supabaseLogistics
    .from('deliveries')
    .insert(deliveryPayload)
    .select()
    .single();

  if (error) {
    console.error('[Dale!TePido Logistics] Error al insertar despacho en Dale!QueVoy:', error);
    throw error;
  }

  return {
    delivery: data,
    deliveryId: data.id,
    pinCode,
    totalWeightKg,
    resolvedCategory,
    suggestedVehicle
  };
}

/**
 * Escucha cambios de estado del cadete en tiempo real a través de Supabase Realtime
 * Estados: SEARCHING -> ACCEPTED -> PICKED_UP -> IN_TRANSIT -> DELIVERED (o CANCELLED)
 * @param {string} deliveryId
 * @param {function} onUpdate - Callback al recibir nuevo estado
 */
export function escucharEstadoCadete(deliveryId, onUpdate) {
  if (!deliveryId) return () => {};

  const channel = supabaseLogistics
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
        if (typeof onUpdate === 'function') {
          onUpdate(payload.new);
        }
      }
    )
    .subscribe();

  return () => {
    supabaseLogistics.removeChannel(channel);
  };
}

export default {
  supabaseLogistics,
  BUSINESS_TYPES,
  normalizeBusinessType,
  generateSecurityPin,
  calculateOrderMetrics,
  despacharEnvioDaleQueVoy,
  escucharEstadoCadete
};
