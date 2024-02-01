import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-like.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
