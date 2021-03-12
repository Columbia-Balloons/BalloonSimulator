const g = 9.81;

function lift(volume, h, rho_air, rho_gas) {
	const m_displaced = rho_air * volume;
	const m_gas = rho_gas * volume;

	return (m_displaced - m_gas) * g;
}

function weight(m, h) {
	const G = -6.67 * 10**(-11);
	const R_e = 6.371 * 10**6;
	const m_e = 5.972 * 10**24;

	return G * m * m_e / (R_e + h)**2;
}

function drag(Cd, A, rho_air, v) {
	return 0.5 * Cd * A * rho_air * v**2;
}

function air_density(h) {
	const T = temperature(h);
	const P = pressure(h, T);

	return P / (0.2869 * T);
}

function gas_density(p, t) {
	const molar_mass = 4;
	const R = 0.08206;

	return molar_mass * p / (R * t);
}

function temperature(h) {
	let T = 0;

	if (h < 11000) {
        T = 15.04 - 0.00649 * h;
	}
    else if (h > 11000 && h < 25000){
        T = -56.46;
    }
    else {
        T = -131.21 + 0.00299 * h;
    }

    return T + 273.15;
}

function pressure(h, T) {
	let p = 0;

	if (h < 11000) {
        p = 101.29 * (T / 288.08)**(5.256);
	}
    else if (h > 11000 && h < 25000) {
        p = 22.65 * math.E**(1.73 - 0.000157 * h);
    }
    else {
        p = 2.488 * (T / 216.6)**(-11.388);
    }

    return p;
}

function stats(h, v, diameter, mass, m_gas, delta_t) {
	let radius = diameter / 2;
	let volume = (4/3) * Math.PI * radius**3;
	const area = Math.PI * radius**2;
	const rho_air = air_density(h);
	const temp0 = temperature(h);
	const p0 = pressure(h, temp0);
	const rho_gas = gas_density(p0, temp0);
	const Cd = 0.25;

	let sign_v = 1
	if (v !== 0) {
    	sign_v = v / Math.abs(v);
    }

	const acceleration = (lift(volume, h, rho_air, rho_gas) - weight(mass, h) - sign_v * drag(Cd, area, rho_air, v)) / mass;
	const velocity = v + acceleration * delta_t;
	const height = h + velocity * delta_t;

	const temp1 = temperature(height);
	const p1 = pressure(height, temp1);

	volume = p0 * temp1 * volume / (p1 * temp0);
	radius = (3 * volume / (4 * Math.PI))**(1/3);
	diameter = radius * 2;

	ret = {
		"height": height,
		"velocity": velocity,
		"acceleration": acceleration,
		"diameter": diameter
	};

	return ret;
}