-- CreateTable
CREATE TABLE "Sprint" (
    "id" SERIAL NOT NULL,
    "sprint" VARCHAR(50) NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cabecera" (
    "id" SERIAL NOT NULL,
    "idSprint" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "observacion" VARCHAR(50) NOT NULL,
    "sgcan" BOOLEAN NOT NULL,

    CONSTRAINT "Cabecera_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "modulo" VARCHAR(50) NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" SERIAL NOT NULL,
    "documento" VARCHAR(50) NOT NULL,
    "idModulo" INTEGER NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "categoria" VARCHAR(100) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metodo" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "metodo" VARCHAR(100) NOT NULL,
    "idCategoria" INTEGER NOT NULL,

    CONSTRAINT "Metodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detalle" (
    "id" SERIAL NOT NULL,
    "idCabecera" INTEGER NOT NULL,
    "idCategoria" INTEGER NOT NULL,
    "idMetodo" INTEGER NOT NULL,
    "idModulo" INTEGER NOT NULL,
    "idDocumento" INTEGER NOT NULL,
    "esquema1" MONEY NOT NULL,
    "esquema2" MONEY NOT NULL,
    "esquema3" MONEY NOT NULL,
    "esquema4" MONEY NOT NULL,
    "esquema5" MONEY NOT NULL,
    "esquema6" MONEY NOT NULL,
    "es" MONEY NOT NULL,
    "flujo" MONEY NOT NULL,
    "avance" MONEY NOT NULL,
    "observacion" TEXT NOT NULL,
    "observado" BOOLEAN NOT NULL,

    CONSTRAINT "Detalle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cabecera" ADD CONSTRAINT "Cabecera_idSprint_fkey" FOREIGN KEY ("idSprint") REFERENCES "Sprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_idModulo_fkey" FOREIGN KEY ("idModulo") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metodo" ADD CONSTRAINT "Metodo_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_idCabecera_fkey" FOREIGN KEY ("idCabecera") REFERENCES "Cabecera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_idMetodo_fkey" FOREIGN KEY ("idMetodo") REFERENCES "Metodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_idModulo_fkey" FOREIGN KEY ("idModulo") REFERENCES "Modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_idDocumento_fkey" FOREIGN KEY ("idDocumento") REFERENCES "Documento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
