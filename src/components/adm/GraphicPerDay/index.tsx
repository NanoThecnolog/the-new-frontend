import BarGraphic, { BarDataProps } from '@/components/ui/BarGraphic'

interface GraphicPerDayProps {
    data: BarDataProps
}

export default function GraphicPerDay({ data }: GraphicPerDayProps) {
    return (
        <>
            {
                data.length > 0 && <BarGraphic data={data} title='Leitores dos últimos sete dias' slicer={-7} />
            }
        </>
    )
}