-- CreateEnum
CREATE TYPE "Rules" AS ENUM ('NORMAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "TipoServico" AS ENUM ('REBOQUE', 'TRANSPORTE', 'BOMBEIROS', 'AMBULANCIA');

-- CreateEnum
CREATE TYPE "TipoProblema" AS ENUM ('REBOQUE', 'TRANSPORTE', 'BOMBEIROS', 'AMBULANCIA');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ABERTO', 'EM_ANDAMENTO', 'CONCLUIDO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "email_verify" TEXT NOT NULL,
    "rules" "Rules" NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parceiro" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipoServico" "TipoServico" NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Parceiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emergencia" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipoProblema" "TipoProblema" NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT,
    "status" "Status" NOT NULL DEFAULT 'ABERTO',
    "parceiroId" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataConclusao" TIMESTAMP(3),

    CONSTRAINT "Emergencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL,
    "emergenciaId" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizPergunta" (
    "id" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizPergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResposta" (
    "id" TEXT NOT NULL,
    "perguntaId" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "correta" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuizResposta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricoQuiz" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "perguntaId" TEXT NOT NULL,
    "respostaId" TEXT NOT NULL,
    "dataResposta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoricoQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Parceiro_telefone_key" ON "Parceiro"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Parceiro_email_key" ON "Parceiro"("email");

-- AddForeignKey
ALTER TABLE "Emergencia" ADD CONSTRAINT "Emergencia_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emergencia" ADD CONSTRAINT "Emergencia_parceiroId_fkey" FOREIGN KEY ("parceiroId") REFERENCES "Parceiro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_emergenciaId_fkey" FOREIGN KEY ("emergenciaId") REFERENCES "Emergencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResposta" ADD CONSTRAINT "QuizResposta_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "QuizPergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoQuiz" ADD CONSTRAINT "HistoricoQuiz_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoQuiz" ADD CONSTRAINT "HistoricoQuiz_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "QuizPergunta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoricoQuiz" ADD CONSTRAINT "HistoricoQuiz_respostaId_fkey" FOREIGN KEY ("respostaId") REFERENCES "QuizResposta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
