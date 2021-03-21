function falling(h, v, parachute_d, mass, delta_t) {
	const g = 9.81;
	const Cd = 0.25;
	const area = Math.PI * (parachute_d / 2)**2;
	const rho_air = air_density(h);
	
	const acceleration = drag(Cd, area, rho_air, v) + weight(mass, h);
	const velocity = v + acceleration * delta_t;
	const height = h + velocity * delta_t;

	ret = {
		"height": height,
		"velocity": velocity,
		"acceleration": acceleration,
	};

	return ret;	
}