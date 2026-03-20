-- SQL Schema for PZ_SISTEMA_APP Database
-- This script creates the tables needed to store PISEE skill responses.
-- Optimized for SQL Server / T-SQL compatible databases

CREATE DATABASE IF NOT EXISTS PZ_SISTEMA_APP;
USE PZ_SISTEMA_APP;

-- Main table: Summary of the query response
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PISEE_HabilidadRespuesta' AND xtype='U')
CREATE TABLE PISEE_HabilidadRespuesta (
    id VARCHAR(32) PRIMARY KEY DEFAULT (REPLACE(CAST(NEWID() AS VARCHAR(36)), '-', '')), -- Automatic 32-digit token
    success VARCHAR(10),
    trace VARCHAR(100),
    rut VARCHAR(20),
    estado VARCHAR(50),
    acreditacionVigente BIT, -- Boolean-equivalent in SQL Server (0/1)
    fechaCalculoHabilidad DATE, -- DD-MM-YYYY transformed to YYYY-MM-DD
    fechaConsulta DATETIME,      -- DD-MM-YYYY HH:mm transformed to proper datetime
    errores NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);

-- Detail table: Itemized compliance causes
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='PISEE_HabilidadCausales' AND xtype='U')
CREATE TABLE PISEE_HabilidadCausales (
    id VARCHAR(32) PRIMARY KEY DEFAULT (REPLACE(CAST(NEWID() AS VARCHAR(36)), '-', '')), -- Automatic 32-digit token
    respuesta_id VARCHAR(32) NOT NULL, -- FK to PISEE_HabilidadRespuesta.id
    causa VARCHAR(255),
    estado VARCHAR(50),
    CONSTRAINT FK_PISEE_Causales_Respuesta FOREIGN KEY (respuesta_id) 
    REFERENCES PISEE_HabilidadRespuesta(id) ON DELETE CASCADE
);
