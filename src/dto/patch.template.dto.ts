// Data transfer objects (DTOs)
import { PutTemplateDto } from './put.template.dto';

export interface PatchTemplateDto extends Partial<PutTemplateDto> {}