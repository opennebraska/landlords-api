import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        await this.userRepository.signUp(authCredentialsDto);
        const {username} = authCredentialsDto
        const payload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken}
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto)
        if (!username) {
            throw new UnauthorizedException(`Invalid Credentials`)
        }

        const payload = {username};
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken}
    }
}
