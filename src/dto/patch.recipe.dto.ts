// Data transfer objects (DTOs)
import { PutRecipeDto } from './put.recipe.dto';

export interface PatchRecipeDto extends Partial<PutRecipeDto> {}