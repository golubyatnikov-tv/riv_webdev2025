import type { FC } from "react";
import { useCosmicObjectsQuery } from "./api";

export const Visualizer: FC<{
    orientation?: 'horizontal' | 'vertical'
    maxCount?: number
}> = ({ orientation = 'horizontal', maxCount = 5 }) => {
    const { data } = useCosmicObjectsQuery();

    const list = data?.toSorted((a, b) => b.diameterKm - a.diameterKm)?.slice(0, maxCount);
    const maxDiameter = list?.reduce((r, o) => o.diameterKm > r ? o.diameterKm : r, 0) ?? 0;

    return (
        <>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexDirection: orientation === 'horizontal' ? 'row' : 'column',
                overflow: 'auto'
            }}>
                {list?.map((o) => {
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