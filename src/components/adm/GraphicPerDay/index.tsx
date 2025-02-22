import { DataProps } from '@/utils/utilities'
import styles from './styles.module.scss'
import BarGraphic, { BarDataProps } from '@/components/ui/BarGraphic'

interface GraphicPerDayProps {
    data: BarDataProps
}

export default function GraphicPerDay({ data }: GraphicPerDayProps) {
    return (
        <>
            {
                data.length > 0 && <BarGraphic data={data} title='NewsLetters dos últimos sete dias' slicer={-7} />
            }
        </>
    )
}