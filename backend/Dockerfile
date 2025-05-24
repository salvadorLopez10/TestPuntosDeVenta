# Dockerfile para el backend .NET
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar archivos de proyecto desde backend/
COPY ["backend/PuntoVentaAPI/PuntoVentaAPI.csproj", "PuntoVentaAPI/"]
COPY ["backend/PuntoVenta.Application/PuntoVenta.Application.csproj", "PuntoVenta.Application/"]
COPY ["backend/PuntoVenta.Domain/PuntoVenta.Domain.csproj", "PuntoVenta.Domain/"]
COPY ["backend/PuntoVenta.Infrastructure/PuntoVenta.Infrastructure.csproj", "PuntoVenta.Infrastructure/"]

# Restaurar dependencias
RUN dotnet restore "PuntoVentaAPI/PuntoVentaAPI.csproj"

# Copiar todo el código del backend
COPY backend/ .
WORKDIR "/src/PuntoVentaAPI"

# Build
RUN dotnet build "PuntoVentaAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PuntoVentaAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# El puerto que Render asigna
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "PuntoVentaAPI.dll"]