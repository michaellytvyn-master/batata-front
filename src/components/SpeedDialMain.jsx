import {
	CogIcon,
	HomeIcon,
	PlusIcon,
	Square3Stack3DIcon,
} from "@heroicons/react/24/outline"
import {
	IconButton,
	SpeedDial,
	SpeedDialAction,
	SpeedDialContent,
	SpeedDialHandler,
} from "@material-tailwind/react"

export function SpeedDialMain() {
	return (

					<div className="fixed bottom-7 right-7">
							<SpeedDial>
									<SpeedDialHandler>
											<IconButton size="lg" className="rounded-full">
													<PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
											</IconButton>
									</SpeedDialHandler>
									<SpeedDialContent>
											<SpeedDialAction>
													<HomeIcon className="h-5 w-5" />
											</SpeedDialAction>
											<SpeedDialAction>
													<CogIcon className="h-5 w-5" />
											</SpeedDialAction>
											<SpeedDialAction>
													<Square3Stack3DIcon className="h-5 w-5" />
											</SpeedDialAction>
									</SpeedDialContent>
							</SpeedDial>
					</div>
	);
}