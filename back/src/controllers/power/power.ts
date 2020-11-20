import {Controller, Get, PathParams, Post} from "@tsed/common";
import {ContentType, Returns, ArrayOf} from "@tsed/schema"
import {BadRequest} from "@tsed/exceptions"
import {Power as PowerService} from "../../core/services/power/power";
import { Powerplan } from "./models";

@Controller("/power")
export class Power {

    @ContentType("application/json")
    @Returns(200, Array).Of(Powerplan)
    @Get("/powerplans")
    async listPowerplan() {
        return PowerService.Powerplan.list();
    }


    @Returns(200)
    @Returns(BadRequest.STATUS)
    @Post("/powerplans/:id")
    async setCurrent(@PathParams("id") id: string) {

        const pp = await PowerService.Powerplan.get(id)

        if (pp === undefined) {
            throw new BadRequest("Unknown powerplan")
        }

        return PowerService.Powerplan.set(pp)
    }


}
