import { Controller ,Module ,Get} from "@nestjs/common";


@Controller('/app')
export class AppController{
    @Get('/abc')
    getRootRoute(){
        return 'hi there';
    }

    @Get('bye')
    getByTher(){
        return 'bye there';
    }


}