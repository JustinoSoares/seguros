import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => UsersModule)],
    exports: [EmailService],
    providers: [EmailService],
})
export class EmailModule {}
