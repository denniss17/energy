-- auto-generated definition
create table meter_readings
(
    id          bigserial not null
        constraint meter_readings_pkey
            primary key,
    timestamp   timestamp with time zone,
    energy_high bigint,
    energy_low  bigint,
    gas         bigint,
    water       double precision
);
