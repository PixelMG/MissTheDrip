class Game
{
	constructor(width, height)
	{
		this.width = document.documentElement.clientWidth // width
		this.height = document.documentElement.clientHeight // height
		this.debounce = 0

		this.Init()
	}

	Init = async () =>
	{
		this.viewport = document.createElement('canvas')
		this.viewport.width = this.width
		this.viewport.height = this.height

		this.ctx = this.viewport.getContext('2d')

		this.objects = []

		document.body.appendChild(this.viewport)

		await this.Update()
		await this.Draw()
	}

	Update = async () =>
	{
		if(this.debounce > 0)
			this.debounce--

		if(this.debounce < 1)
		{
			let x = Math.round(Math.random(0, this.width + input.mouseX) * 1000)
			this.objects.push({ x: input.mouseX, y: -10, w: 20, h: 20, speed: 5 })
			this.debounce = 5
		}

		for(let key in this.objects)
		{
			let object = this.objects[key]

			if(object.y <= this.viewport.height)
				object.y += object.speed

			if(object.y > this.viewport.height)
				this.objects.splice(key, 1)

			if(input.mouseX >= object.x &&
				input.mouseX <= object.x + object.w &&
				input.mouseY >= object.y &&
				input.mouseY <= object.y + object.h)
			{
				this.objects = []
				alert('You LOSE! You get NOTHING!')
				break
			}
		}

		requestAnimationFrame(this.Update)
	}

	Draw = async () =>
	{
		this.ctx.fillStyle = '#c6c6c6'
		this.ctx.clearRect(0, 0, this.width, this.height)
		this.ctx.fillRect(0, 0, this.width, this.height)

		for(let key in this.objects)
		{
			let object = this.objects[key]

			this.ctx.fillStyle = '#0f00ff'
			this.ctx.fillRect(object.x, object.y, object.w, object.h)
		}

		requestAnimationFrame(this.Draw)
	}
}

let input =
{
	mouseState: null,
	mouseX: 0,
	mouseY: 0
}

let game = new Game(1280, 720)

window.addEventListener('mousedown', (e) =>
{
	input.mouseState = 'down'
	input.mouseX = e.pageX
	input.mouseY = e.pageY
})

window.addEventListener('mousemove', (e) =>
{
	input.mouseX = e.pageX
	input.mouseY = e.pageY
})

window.addEventListener('mouseup', (e) =>
{
	input.mouseState = 'up'
})