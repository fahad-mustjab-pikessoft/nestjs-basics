import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { DiskModule } from 'src/disk/disk.module';
import { PowerService } from 'src/power/power.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],
  providers: [CpuService], 
  exports: [CpuService]  
})
export class CpuModule {}
