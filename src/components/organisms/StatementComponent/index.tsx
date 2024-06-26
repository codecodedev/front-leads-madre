import { Avatar } from '@/components/molecules'
import { ExtractProfile } from '@/types/general'
import { useFormatter } from 'next-intl'

type StatementComponentProps = {
  extract?: ExtractProfile[]
}

const StatementComponent = ({ extract }: StatementComponentProps) => {
  const format = useFormatter()
  return (
    <div className="w-full bg-stone-200 rounded-md px-0 md:px-4">
      <div className="w-full md:w-full">
        <div className="rounded-xl rounded-tl-none p-6 pl-0 relative">
          {extract?.map((item, idx) => (
            <div className="w-full mb-6 flex flex-row" key={idx}>
              <div className="flex flex-col justify-center items-center px-4">
                <Avatar size={20} classIcon="bg-green-700 z-20" icon="Check" />
                <div className="h-full w-1 absolute top-0 z-10 bg-gray-300" />
              </div>

              <div className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <div className="w-full flex flex-col sm:flex-row justify-between items-center text-wrap">
                  <h2 className="font-bold text-green-700 truncate">
                    {`${item.amount_receive.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })} PAGO`}
                  </h2>
                  <h4 className="font-medium text-stone-500 truncate">
                    {format.dateTime(new Date(item.createdAt), {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </h4>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex flex-row">
            <div className="flex flex-col justify-center items-center px-4">
              <Avatar size={20} classIcon="bg-gray-500 z-20" icon="Clock" />
              <div className="h-full w-1 bg-gray-300" />
            </div>
            <div className="w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatementComponent
