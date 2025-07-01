export interface RegisterRequestDto {
  username: string;
  password: string;
  roles: string[];
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  jwtToken: string;
}

export interface RegionDto {
  id: string;
  code: string;
  name: string;
  regionImageUrl?: string;
}

export interface WalkDto {
  id: string;
  name: string;
  description: string;
  lengthInKm: number;
  walkImageUrl?: string;
  difficultyId: string;
  regionId: string;
  difficulty: DifficultyDto;
  region: RegionDto;
}

export interface DifficultyDto {
  id: string;
  name: string;
}

export interface ImageUploadRequestDto {
  file: File;
  fileName: string;
  fileDescription?: string;
}

export interface ImageDto {
  id: string;
  fileName: string;
  fileDescription?: string;
  fileExtension: string;
  fileSizeInBytes: number;
  filePath: string;
}
