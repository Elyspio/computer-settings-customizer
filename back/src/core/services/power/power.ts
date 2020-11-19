import {Powerplan} from "./types";
import * as util from "util";
import * as child_process from "child_process";

const exec = util.promisify(child_process.exec);

export namespace Power {

    export namespace Powerplan {

        export async function list(): Promise<Powerplan[]> {
            const {stdout} = await exec("powercfg /l")
            const powerplanStr = stdout.split("\r\n").filter(s => s.toLowerCase().startsWith("power"));
            return powerplanStr.map(s => {
                const [id, label] = s.replace(/Power Scheme GUID: (.*) {2}\((.*)\).*/, "$1;$2").split(";")
                return {
                    id,
                    label,
                    current: s.slice(-2) === " *"
                }
            })
        }

        export async function set(powerplan: Powerplan) {
            await exec(`powercfg -setactive ${powerplan.id}`)
        }

        export async function get(id: Powerplan["id"]) {
            return (await list()).find(p => p.id === id);
        }
    }


}
