-- auto-generated definition
create table meter_readings
(
    id          uuid                     not null
        constraint meter_readings_pkey
            primary key,
    timestamp   timestamp with time zone not null,
    energy_high bigint                   not null,
    energy_low  bigint                   not null,
    gas         bigint                   not null,
    water       double precision         not null
);
