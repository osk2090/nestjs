import {ApiProperty} from "@nestjs/swagger";

export class ReadOnlyCatDto {
    @ApiProperty({
        example: 'osk@naver.com',
        description: 'email',
    })
    id: string;

    @ApiProperty({
        example: 'osk@naver.com',
        description: 'email',
    })
    email: string;

    @ApiProperty({
        example: 'osk',
        description: 'name',
    })
    name: string;
}