-- Script SQL: Agregar columnas de auditoría de WhatsApp a la tabla orders en Supabase
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS whatsapp_status text DEFAULT 'pendiente',
ADD COLUMN IF NOT EXISTS whatsapp_last_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS whatsapp_log jsonb DEFAULT '[]'::jsonb;

-- Comentario descriptivo
COMMENT ON COLUMN public.orders.whatsapp_status IS 'Estado de la notificación por WhatsApp (pendiente, enviado, fallido)';
COMMENT ON COLUMN public.orders.whatsapp_last_sent_at IS 'Fecha y hora del último envío de WhatsApp al cliente';
COMMENT ON COLUMN public.orders.whatsapp_log IS 'Histórico de mensajes de WhatsApp enviados para este pedido';
