import { useSystem } from "../../stores/system"

export function useStackInit(title?: string) {
    const system = useSystem()
    system.setCurrentStack(title)
}