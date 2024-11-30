/*
  Warnings:

  - You are about to drop the column `nome` on the `Parceiro` table. All the data in the column will be lost.
  - You are about to drop the column `endereco` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `nome_completo` to the `Parceiro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome_completo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `telefone` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parceiro" DROP COLUMN "nome",
ADD COLUMN     "nome_completo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "endereco",
DROP COLUMN "nome",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "nome_completo" TEXT NOT NULL,
ALTER COLUMN "telefone" SET NOT NULL;
