import {Controller, Get, PathParams, Post} from "@tsed/common";
import {ContentType, Returns} from "@tsed/schema"
import {BadRequest} from "@tsed/exceptions"
import {Power as PowerService} from "../../core/services/power/power";

@Controller("/power")
export class Power {

    @ContentType("application/json")
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
