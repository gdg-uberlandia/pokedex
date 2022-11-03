import logoSymbol from '~/assets/images/logo.svg'
import { Image } from '~/components'

export function Logo() {
  return (
    <figure className="w-full max-w-[246px] h-9 flex justify-center gap-3 py-3 mx-auto mb-7 rounded-full bg-white">
      <Image src={logoSymbol} alt="My logo" />
      <h3 className="font-press text-[10px]">devfest cerrado 22</h3>
    </figure>
  );
}
