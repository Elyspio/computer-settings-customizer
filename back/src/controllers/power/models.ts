import { Property } from "@tsed/schema"

export class Powerplan {
    @Property()
    id: string

    @Property()
    label: string
    
    @Property()
    current: boolean
}