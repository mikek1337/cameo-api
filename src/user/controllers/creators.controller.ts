import { Controller, Get, Query } from "@nestjs/common";
import { CreatorService } from "../service/creator.service";

@Controller("creators")
export class CreatorController{
  constructor(private readonly creatorService:CreatorService){}

  @Get()
  getTopCreators() {
   console.log(this.creatorService.getTopCreators()); 
    return this.creatorService.getTopCreators();
  }

  @Get('creator')
  getCreator(@Query() creatorID:string) {
    return this.creatorService.getCreator(creatorID);
  }
}
