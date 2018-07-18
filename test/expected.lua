
function _assign(sources)
  local target = sources[1]
  del(sources, target)
  for source in all(sources) do
    for key, value in pairs(source) do
      target[key] = value
    end
  end

  return target
end

function getinput()
  return {
    moveleft = btn(0, 0),
    moveright = btn(1, 0),
    jump = btn(4, 0)
  }
end
local left = -1
local right = 1
local terminal_velocity = -2.4
local gravity = 0.1

function roundtonearestcell(value)
  return flr(value / 8)
end

function issolid(x, y)
  return fget(mget(roundtonearestcell(x), roundtonearestcell(y)), 0)
end

function updatephysics(actor, elapsedtime)
  local proxy = _assign({{

  }, actor})
  local direction = proxy.input.moveleft and left or proxy.input.moveright and right or 0
  if (direction != 0) then
    proxy.direction = direction
  end
  if (proxy.input.jump and proxy.jumptime < 0.2) then
    proxy.yvelocity = proxy.jumpvelocity
    proxy.jumptime += elapsedtime
  end
  local deltax = direction * proxy.movevelocity
  local deltay = max(terminal_velocity, proxy.yvelocity - gravity)
  local x1 = proxy.x + deltax
  local y1 = proxy.y - deltay
  local xm = x1 + 4
  local ym = y1 + 4
  local x2 = x1 + 8
  local y2 = y1 + 8
  if (issolid(x1, ym) and (issolid(x1, y1) or issolid(x1, y2))) then
    proxy.x = (roundtonearestcell(x1) + 1) * 8
    deltax = 0
  end
  if (issolid(x2, ym) and (issolid(x2, y1) or issolid(x2, y2))) then
    proxy.x = roundtonearestcell(x1) * 8
    deltax = 0
  end
  local iscollidingbottom = issolid(xm, y2) and (issolid(x1, y2) or issolid(x2, y2))
  if (iscollidingbottom) then
    proxy.y = roundtonearestcell(y1) * 8
    proxy.jumptime = 0
    proxy.input.jump = false
    deltay = 0
  end
  local iscollidingtop = issolid(xm, y1) and (issolid(x1, y1) or issolid(x2, y1))
  if (iscollidingtop and not iscollidingbottom) then
    proxy.y = (roundtonearestcell(y1) + 1) * 8
    proxy.yvelocity = 0
    proxy.jumptime = 0.2
    deltay = 0
  end
  proxy.x += deltax
  proxy.y -= deltay
  proxy.yvelocity = deltay
  proxy.xvelocity = deltax
  _assign({actor, proxy})
end

function updateanimation(actor, elapsedtime)
  local current = actor.current
  if (actor.yvelocity != 0) then
    actor.current = actor.sprites.jump
  elseif (actor.xvelocity != 0) then
    actor.current = actor.sprites.run
  elseif (actor.xvelocity == 0) then
    actor.current = actor.sprites.default
  end
  if (actor.current != current) then
    actor.cursor = 0
  end
  actor.current = actor.current or actor.sprites.default
  animate(actor, elapsedtime)
end

function animate(actor, elapsedtime)
  actor.cursor = (actor.cursor + elapsedtime / actor.current.duration) % actor.current.frames
end

function createactor(ref)
  local x = ref.x
  if (x == nil) then
    x = 0
  end
  local y = ref.y
  if (y == nil) then
    y = 0
  end
  local health = ref.health
  if (health == nil) then
    health = 1000
  end
  local direction = ref.direction
  if (direction == nil) then
    direction = 0
  end
  local xvelocity = ref.xvelocity
  if (xvelocity == nil) then
    xvelocity = 0
  end
  local yvelocity = ref.yvelocity
  if (yvelocity == nil) then
    yvelocity = 0
  end
  local sprites = ref.sprites
  local moveacceleration = ref.moveacceleration
  local movevelocity = ref.movevelocity
  local jumpvelocity = ref.jumpvelocity
  local input = ref.input
  return {
    x = x,
    y = y,
    cursor = 0,
    current = sprites.default,
    sprites = sprites,
    health = health,
    direction = direction,
    jumptime = 0,
    input = input,
    xvelocity = xvelocity,
    yvelocity = yvelocity,
    moveacceleration = moveacceleration,
    movevelocity = movevelocity,
    jumpvelocity = jumpvelocity
  }
end

function createkeyframeanimation(index, frames, duration, widthunits, heightunits)
  if (frames == nil) then
    frames = 1
  end
  if (duration == nil) then
    duration = 1
  end
  if (widthunits == nil) then
    widthunits = 1
  end
  if (heightunits == nil) then
    heightunits = 1
  end
  return {
    index = index,
    frames = frames,
    duration = duration,
    widthunits = widthunits,
    heightunits = heightunits
  }
end
local goomba = {
  default = createkeyframeanimation(5, 1, 1, 1, 1),
  run = createkeyframeanimation(5, 2, 0.3, 1, 1)
}
local koopa = {
  default = createkeyframeanimation(7, 1, 1, 1, 1),
  run = createkeyframeanimation(7, 2, 0.3, 1, 1)
}
local mario = {
  default = createkeyframeanimation(1, 1, 1, 1, 1),
  run = createkeyframeanimation(2, 2, 0.15, 1, 1),
  jump = createkeyframeanimation(4, 1, 1, 1, 1)
}
local piranha = {
  default = createkeyframeanimation(28, 1, 0, 2, 1),
  attack = createkeyframeanimation(28, 2, 0.4, 2, 1)
}
local actors = {

}
local player = nil

function init()
  player = createactor({
    x = 40,
    top = 30,
    direction = right,
    sprites = mario,
    movevelocity = 0.7,
    jumpvelocity = 2
  })
  add(actors, player)
end

function update(elapsedtime)
  player.input = getinput()
  foreach(actors, function (actor)
    updatephysics(actor, elapsedtime)
    updateanimation(actor, elapsedtime)
  end)
end

function draw()
  local camerax = player.x - 60
  local cameray = player.y - 60
  rectfill(camerax - 1, cameray - 1, camerax + 129, cameray + 129, 0)
  camera(camerax, cameray)
  map(flr(camerax / 8), flr(cameray / 8), flr(camerax / 8) * 8, flr(cameray / 8) * 8, 17, 17)
  foreach(actors, function (actor)
    local sprite = actor.current
    spr(sprite.index + flr(actor.cursor) * sprite.widthunits, actor.x, actor.y, sprite.widthunits, sprite.heightunits, actor.direction == right)
  end)
end

function _init()
  cls()
  init()
end

function _update60()
  update(1 / 60)
end

function _draw()
  draw()
end
