-- Asegúrate de ejecutar esto en tu base de datos PostgreSQL

-- 1. Tabla espacios: columna estado
ALTER TABLE espacios
ADD COLUMN IF NOT EXISTS estado VARCHAR(20) DEFAULT 'Disponible';

-- 2. Tabla vehiculos: columnas y relación
ALTER TABLE vehiculos
ADD COLUMN IF NOT EXISTS espacio_id INT,
ADD COLUMN IF NOT EXISTS entrada TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS salida TIMESTAMP;

-- 3. Relación foránea espacio_id -> espacios(id)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'fk_vehiculo_espacio'
          AND table_name = 'vehiculos'
    ) THEN
        ALTER TABLE vehiculos
        ADD CONSTRAINT fk_vehiculo_espacio
        FOREIGN KEY (espacio_id) REFERENCES espacios(id);
    END IF;
END$$;

-- 4. Tabla pagos: asegúrate de que tenga placa, monto, fecha, metodo
ALTER TABLE pagos
ADD COLUMN IF NOT EXISTS placa VARCHAR(20),
ADD COLUMN IF NOT EXISTS monto NUMERIC,
ADD COLUMN IF NOT EXISTS fecha TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS metodo VARCHAR(20);

-- 5. Asegura que los valores de estado sean consistentes
UPDATE espacios SET estado = 'Disponible' WHERE estado IS NULL OR estado = '';
