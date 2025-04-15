type CameraDevice = {
	name: string
	id: string
	password: string
}

type CameraDevices = {
	cameras: CameraDevice[]
}

type Record = {
	id: string
	name: string
	duration: string
}

type Records = Record[]

export type { CameraDevice, CameraDevices, Record, Records }
