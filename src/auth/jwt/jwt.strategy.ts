import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {Payload} from "./jwt.payload";
import {CatsRepository} from "../../cats/cats.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: Payload) {
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat;//request.user
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}