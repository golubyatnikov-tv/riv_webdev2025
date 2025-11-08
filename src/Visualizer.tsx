import { useCosmicObjects } from "./api";

export const Visualizer = () => {
    const { data } = useCosmicObjects();

    const maxDiameter = data?.reduce((r, o) => o.diameterKm > r ? o.diameterKm : r, 0) ?? 0;

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {data?.toSorted((a, b) => b.diameterKm - a.diameterKm)
                    .map((o) => {
                        const size = 150;
                        const k = o.diameterKm / maxDiameter
                        const actualSize = k * size;
                        return (
                            <div
                                style={{
                                    color: o.color,
                                }}>
                                <div style={{
                                    borderRadius: '50%',
                                    background: o.color,
                                    width: actualSize,
                                    height: actualSize
                                }}></div>
                                {o.name}
                            </div>
                        )
                    })}
            </div>
        </>
    )
}