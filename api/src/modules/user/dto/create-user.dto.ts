import { Role } from '@app/constants/role.constants'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(21)
  @Matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{6,21}$/, {
    message: 'Username must be alphanumeric min 6 and max 21 characters long!'
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W|_]){6,}.*$/, {
    message: 'Password must be at least 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Characters!'
  })
  password: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phoneNumber: string

  @IsString()
  @IsNotEmpty()
  role: Role
}
