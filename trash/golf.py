import copy

FIELD_CR = 70.6
FIELD_SLOPE = 121

pit_count = 18
player_hcp = 22
PAR = [3, 4, 5, 5, 4, 4, 4, 3, 4, 3, 4, 5, 5, 4, 4, 4, 3, 4]
HCP = [15, 5, 11, 1, 3, 7, 9, 17, 13, 16, 6, 12, 2, 4, 8, 10, 18, 14]
hits_v1 = [5, 4, 10, 3, 4, 4, 6, 3, 7, 3, 4, 8, 9, 4, 4, 6, 3, 4]
hits_v2 = [4, 5, 6, 7, 6, 5, 5, 4, 5, 4, 5, 6, 7, 6, 5, 5, 4, 5]


# first variant
bonus_pits = player_hcp - pit_count

hcp_sort = copy.copy(HCP)
hcp_sort.sort()
min_bonus = hcp_sort[bonus_pits - 1]
del hcp_sort

bonus_hits = [1] * pit_count
max_allowed = [0] * pit_count
points = [0] * pit_count
penalty = 0
template = "{:>3} | {:>3} | {:>3} | {:>3} | {:>3} | {:>3} | {:>3} | {:>3}"
print(template.format("#", "PAR", "HCP", "HIT", "BNS", "max", "PEN", "PTS"))
for pit in range(pit_count):
    if HCP[pit] <= min_bonus:
        bonus_hits[pit] = 2
    max_allowed[pit] = PAR[pit] + 2 + bonus_hits[pit]

    if hits_v1[pit] > max_allowed[pit]:
        tmp = hits_v1[pit] - max_allowed[pit]
    else:
        tmp = 0
    points[pit] = hits_v1[pit] - tmp
    penalty += tmp
    print(template.format(pit + 1, PAR[pit], HCP[pit], hits_v1[pit], "++" if bonus_hits[pit] == 2 else "+", max_allowed[pit], "" if tmp == 0 else tmp, points[pit]))
print("-" * 50)
print(f"Points slope: {sum(points) + penalty}")
print(f"Points netto: {sum(points)}")
print("-" * 50)
print(f"Tasoitustulos: {(113/FIELD_SLOPE)*(sum(points)-FIELD_CR):.1f}")
print("-" * 50)

# second variant
# delta_table = {2:0,1}

template = "{:>3} | {:>4} | {:>4} | {:>3} | {:>3}"
s = 0
print(template.format("#", "HIT1", "HIT2", "d", "PTS"))
for pit in range(pit_count):
    d = points[pit] - hits_v2[pit]
    s += 2-d
    print(template.format(pit + 1, points[pit], hits_v2[pit],d,2-d))
print("-" * 50)
print(f"Sum: {s}" )
print("-" * 50)