
/****** Object:  Database [PuntoVentaDB]    Script Date: 22/05/2025 12:34:44 a. m. ******/
CREATE DATABASE [PuntoVentaDBb];

USE [PuntoVentaDB]
GO

/****** Object:  Table [dbo].[PuntosVenta]    Script Date: 22/05/2025 12:37:48 a. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PuntosVenta](
      [Id] [int] IDENTITY(1,1) NOT NULL,
      [Latitud] [float] NOT NULL,
      [Longitud] [float] NOT NULL,
      [Descripcion] [nvarchar](255) NOT NULL,
      [Venta] [decimal](18, 2) NOT NULL,
      [Zona] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED
(
      [Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO