import math
import matplotlib.pyplot as plt
g = 9.81
G = -6.67 * 10**(-11)
R_e = 6.371 * 10**6
m_e = 5.972 * 10**24

def lift(volume, h, rho_gas, p):
    rho_air = air_density(h)
    m_displaced = rho_air * volume
    m_gas = rho_gas * volume

    if p:
        print(rho_air)
        print(m_displaced)
        print(m_gas)

    return (m_displaced - m_gas) * g

def weight(mass, h):
    return G * mass * m_e / (h + R_e)**2

def drag(Cd, A, v, h):
    rho_air = air_density(h)
    
    return 0.5 * Cd * A * rho_air * v**2

def air_density(h):
    T = temperature(h)
    P = pressure(h, T) * 101.325

    return P / (0.2869 * T)

def temperature(h):
    if h < 11000:
        T = 15.04 - 0.00649 * h
    elif h > 11000 and h < 25000:
        T = -56.46
    else:
        T = -131.21 + 0.00299 * h

    return T + 273.15

def pressure(h, T):
    if h < 11000:
        p = 101.29 * ((T) / 288.08)**(5.256)
    elif h > 11000 and h < 25000:
        p = 22.65 * math.exp(1.73 - 0.000157 * h)
    else:
        p = 2.488 * ((T) / 216.6)**(-11.388)

    return p / 101.325

def simulate(volume, burst_volume, diameter, mass, delta_t):
    t_list = [0]
    h_list = [0]
    v_list = [0]
    volume_list = [volume]
    A = math.pi * (diameter / 2)**2
    m_gas_fill = 0.164 * volume
    temp0 = temperature(h_list[-1])
    p0 = pressure(0, temp0)
    rho_gas = 4 * p0 / (0.08206 * temp0)
    print('Initial pressure: {}'.format(p0))
    print('Initial temp: {}'.format(temp0))
    print('Initial volume: {}'.format(volume))
    print('Initial gas density: {} (should be 0.164)'.format(rho_gas))

    while volume_list[-1] < burst_volume:
        a = ((lift(volume_list[-1], h_list[-1], rho_gas, False) +
              weight(mass, h_list[-1]) + math.copysign(1.0, -1 * v_list[-1]) *
              drag(0.25, A, v_list[-1], h_list[-1])) / (mass + m_gas_fill))
        
        v_list.append(v_list[-1] + a * delta_t)
        h_list.append(h_list[-1] + v_list[-1] * delta_t)

        temp = temperature(h_list[-1])
        p = pressure(h_list[-1], temp)
        volume_list.append(p0 * temp * volume_list[0] / (p * temp0))

        rho_gas = 4 * p / (0.08206 * temp)

        t_list.append(t_list[-1] + delta_t)

        if t_list[-1] >= 100 and round(t_list[-1], 1) % 100 == 0:
            print(t_list[-1])
            print('Lift: {}'.format(lift(volume_list[-1], h_list[-1], rho_gas,
                                         True)))
            print('Weight: {}'.format(weight(mass, h_list[-1])))
            print('Drag: {}'.format(math.copysign(1.0, -1 * v_list[-1]) *
                                drag(0.25, A, v_list[-1], h_list[-1])))
            print('Acceleration: {}'.format(a))
            print('Velocity: {}'.format(v_list[-1]))
            print('Height: {}'.format(h_list[-1]))
            print('Pressure: {}'.format(p))
            print('Temperature: {}'.format(temp))
            print('Volume: {}'.format(volume_list[-1]))
            print()

    return t_list, h_list, v_list, volume_list

t, h, v, volume = simulate(4/3 * math.pi * 1**3, 4/3 * math.pi * 12**3,
                           2.4, 2, 0.1)
f, (ax1, ax2, ax3) = plt.subplots(3, 1, sharex=True, figsize=(20, 15))

ax1.plot(t, h, color='blue')
ax2.plot(t, v, color='orange')
ax3.plot(t, volume, color='green')

print(h[1])
print(v[1])
print(volume[1])
print(t[1])

plt.show()

 
        
