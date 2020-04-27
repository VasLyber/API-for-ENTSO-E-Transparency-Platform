CREATE TABLE IF NOT EXISTS users
(
user_id bigint PRIMARY KEY,
user_name varchar(255) NOT NULL,
password varchar(255) NOT NULL,
role varchar(255) NOT NULL,
user_quota bigint NOT NULL
);

CREATE TABLE IF NOT EXISTS AllocatedEICDetail (
  Id                                    SERIAL NOT NULL,
  EntityCreatedAt                       timestamp(34) with time zone NOT NULL,
  EntityModifiedAt                      timestamp(34) with time zone NOT NULL,
  MRID                                  varchar(250),
  DocStatusValue                        varchar(250),
  AttributeInstanceComponent            varchar(250),
  LongNames                             varchar(250),
  DisplayNames                          varchar(250),
  LastRequestDateAndOrTime              timestamp(7),
  DeactivateRequestDateAndOrTime        timestamp(7),
  MarketParticipantStreetAddressCountry varchar(250),
  MarketParticipantACERCode             varchar(250),
  MarketParticipantVATcode              varchar(250),
  Description                           varchar(255),
  EICParentMarketDocumentMRID           varchar(250),
  ELCResponsibleMarketParticipantMRID   varchar(250),
  IsDeleted                             bool NOT NULL,
  CONSTRAINT PK_AllocatedEICDetail
    PRIMARY KEY (Id));

CREATE TABLE AreaTypeCode (
  Id               SERIAL NOT NULL,
  EntityCreatedAt  timestamp(34) with time zone NOT NULL,
  EntityModifiedAt timestamp(34) with time zone NOT NULL,
  AreaTypeCodeText varchar(255),
  AreaTypeCodeNote varchar(255),
  CONSTRAINT PK_AreaTypeCode
    PRIMARY KEY (Id));
CREATE UNIQUE INDEX IX_AreaTypeCode_AreaTypeCodeText
  ON AreaTypeCode (AreaTypeCodeText) WHERE (AreaTypeCodeText IS NOT NULL);

CREATE TABLE IF NOT EXISTS MapCode (
  Id               SERIAL NOT NULL,
  EntityCreatedAt  timestamp(34) with time zone NOT NULL,
  EntityModifiedAt timestamp(34) with time zone NOT NULL,
  MapCodeText      varchar(255),
  MapCodeNote      varchar(255),
  CONSTRAINT PK_MapCode
    PRIMARY KEY (Id));
CREATE UNIQUE INDEX IX_MapCode_MapCodeText
  ON MapCode (MapCodeText) WHERE (MapCodeText IS NOT NULL);

CREATE TABLE IF NOT EXISTS ProductionType (
  Id                 SERIAL NOT NULL,
  EntityCreatedAt    timestamp(34) with time zone NOT NULL,
  EntityModifiedAt   timestamp(34) with time zone NOT NULL,
  ProductionTypeText varchar(255),
  ProductionTypeNote varchar(255),
  CONSTRAINT PK_ProductionType
    PRIMARY KEY (Id));
CREATE UNIQUE INDEX IX_ProductionType_ProductionTypeText
  ON ProductionType (ProductionTypeText) WHERE (ProductionTypeText IS NOT NULL);

CREATE TABLE IF NOT EXISTS ResolutionCode (
  Id                 SERIAL NOT NULL,
  EntityCreatedAt    timestamp(34) with time zone NOT NULL,
  EntityModifiedAt   timestamp(34) with time zone NOT NULL,
  ResolutionCodeText varchar(255),
  ResolutionCodeNote varchar(255),
  CONSTRAINT PK_ResolutionCode
    PRIMARY KEY (Id));
CREATE UNIQUE INDEX IX_ResolutionCode_ResolutionCodeText
  ON ResolutionCode (ResolutionCodeText) WHERE (ResolutionCodeText IS NOT NULL);


CREATE TABLE IF NOT EXISTS ActualTotalLoad (
  Id               SERIAL NOT NULL,
  EntityCreatedAt  timestamp(34) with time zone NOT NULL,
  EntityModifiedAt timestamp(34) with time zone NOT NULL,
  ActionTaskID     int8 NOT NULL,
  Status           varchar(2),
  Year             int4 NOT NULL,
  Month            int4 NOT NULL,
  Day              int4 NOT NULL,
  DateTime         timestamp(7) NOT NULL,
  AreaName         varchar(200),
  UpdateTime       timestamp(7) NOT NULL,
  TotalLoadValue   numeric(24, 2) NOT NULL,
  AreaTypeCodeId   int4,
  MapCodeId        int4,
  AreaCodeId       int4 NOT NULL,
  ResolutionCodeId int4,
  RowHash          varchar(255),
  CONSTRAINT "PK_ActualTotalLoad "
    PRIMARY KEY (Id));
CREATE INDEX "IX_ActualTotalLoad _ResolutionCodeId"
  ON ActualTotalLoad (ResolutionCodeId);
CREATE INDEX "IX_ActualTotalLoad _AreaCodeId"
  ON ActualTotalLoad (AreaCodeId);
CREATE INDEX "IX_ActualTotalLoad _AreaTypeCodeId"
  ON ActualTotalLoad (AreaTypeCodeId);
CREATE INDEX "IX_ActualTotalLoad _MapCodeId"
  ON ActualTotalLoad (MapCodeId);
ALTER TABLE ActualTotalLoad ADD CONSTRAINT "FK_ActualTotalLoad _AreaTypeCode_AreaTypeCodeId" FOREIGN KEY (AreaTypeCodeId) REFERENCES AreaTypeCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE ActualTotalLoad ADD CONSTRAINT "FK_ActualTotalLoad _MapCode_MapCodeId" FOREIGN KEY (MapCodeId) REFERENCES MapCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE ActualTotalLoad ADD CONSTRAINT "FK_ActualTotalLoad _ResolutionCode_ResolutionCodeId" FOREIGN KEY (ResolutionCodeId) REFERENCES ResolutionCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE ActualTotalLoad ADD CONSTRAINT FKActualTota167504 FOREIGN KEY (AreaCodeId) REFERENCES AllocatedEICDetail (Id);

CREATE TABLE IF NOT EXISTS AggregatedGenerationPerType (
  Id                     SERIAL NOT NULL,
  EntityCreatedAt        timestamp(34) with time zone NOT NULL,
  EntityModifiedAt       timestamp(34) with time zone NOT NULL,
  ActionTaskID           int8 NOT NULL,
  Status                 varchar(2),
  Year                   int4 NOT NULL,
  Month                  int4 NOT NULL,
  Day                    int4 NOT NULL,
  DateTime               timestamp(7) NOT NULL,
  AreaName               varchar(200),
  UpdateTime             timestamp(7) NOT NULL,
  ActualGenerationOutput numeric(24, 2) NOT NULL,
  ActualConsuption       numeric(24, 2) NOT NULL,
  AreaTypeCodeId         int4,
  ProductionTypeId       int4,
  ResolutionCodeId       int4,
  MapCodeId              int4,
  AreaCodeId             int4 NOT NULL,
  RowHash                varchar(255),
  CONSTRAINT "PK_AggregatedGenerationPerType "
    PRIMARY KEY (Id));
CREATE INDEX "IX_AggregatedGenerationPerType _AreaCodeId"
  ON AggregatedGenerationPerType (AreaCodeId);
CREATE INDEX "IX_AggregatedGenerationPerType _ResolutionCodeId"
  ON AggregatedGenerationPerType (ResolutionCodeId);
CREATE INDEX "IX_AggregatedGenerationPerType _ProductionTypeId"
  ON AggregatedGenerationPerType (ProductionTypeId);
CREATE INDEX "IX_AggregatedGenerationPerType _MapCodeId"
  ON AggregatedGenerationPerType (MapCodeId);
CREATE INDEX "IX_AggregatedGenerationPerType _AreaTypeCodeId"
  ON AggregatedGenerationPerType (AreaTypeCodeId);
ALTER TABLE AggregatedGenerationPerType  ADD CONSTRAINT FKAggregated783487 FOREIGN KEY (AreaCodeId) REFERENCES AllocatedEICDetail (Id);
ALTER TABLE AggregatedGenerationPerType  ADD CONSTRAINT "FK_AggregatedGenerationPerType _AreaTypeCode_AreaTypeCodeId" FOREIGN KEY (AreaTypeCodeId) REFERENCES AreaTypeCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE AggregatedGenerationPerType  ADD CONSTRAINT "FK_AggregatedGenerationPerType _MapCode_MapCodeId" FOREIGN KEY (MapCodeId) REFERENCES MapCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE AggregatedGenerationPerType  ADD CONSTRAINT "FK_AggregatedGenerationPerType _ProductionType_ProductionTypeId" FOREIGN KEY (ProductionTypeId) REFERENCES ProductionType (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE AggregatedGenerationPerType  ADD CONSTRAINT "FK_AggregatedGenerationPerType _ResolutionCode_ResolutionCodeId" FOREIGN KEY (ResolutionCodeId) REFERENCES ResolutionCode (Id) ON UPDATE No action ON DELETE No action;


CREATE TABLE DayAheadTotalLoadForecast (
  Id               SERIAL NOT NULL,
  EntityCreatedAt  timestamp(34) with time zone NOT NULL,
  EntityModifiedAt timestamp(34) with time zone NOT NULL,
  ActionTaskID     int8 NOT NULL,
  Status           varchar(2),
  Year             int4 NOT NULL,
  Month            int4 NOT NULL,
  Day              int4 NOT NULL,
  DateTime         timestamp(7) NOT NULL,
  AreaName         varchar(200),
  UpdateTime       timestamp(7) NOT NULL,
  TotalLoadValue   numeric(24, 2) NOT NULL,
  AreaTypeCodeId   int4,
  MapCodeId        int4,
  AreaCodeId       int4 NOT NULL,
  ResolutionCodeId int4,
  RowHash          varchar(255),
  CONSTRAINT PK_DayAheadTotalLoadForecast
    PRIMARY KEY (Id));
CREATE INDEX IX_DayAheadTotalLoadForecast_MapCodeId
  ON DayAheadTotalLoadForecast (MapCodeId);
CREATE INDEX IX_DayAheadTotalLoadForecast_AreaTypeCodeId
  ON DayAheadTotalLoadForecast (AreaTypeCodeId);
CREATE INDEX IX_DayAheadTotalLoadForecast_AreaCodeId
  ON DayAheadTotalLoadForecast (AreaCodeId);
CREATE INDEX IX_DayAheadTotalLoadForecast_ResolutionCodeId
  ON DayAheadTotalLoadForecast (ResolutionCodeId);
ALTER TABLE DayAheadTotalLoadForecast ADD CONSTRAINT FKDayAheadTo524780 FOREIGN KEY (AreaCodeId) REFERENCES AllocatedEICDetail (Id);
ALTER TABLE DayAheadTotalLoadForecast ADD CONSTRAINT FK_DayAheadTotalLoadForecast_AreaTypeCode_AreaTypeCodeId FOREIGN KEY (AreaTypeCodeId) REFERENCES AreaTypeCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE DayAheadTotalLoadForecast ADD CONSTRAINT FK_DayAheadTotalLoadForecast_MapCode_MapCodeId FOREIGN KEY (MapCodeId) REFERENCES MapCode (Id) ON UPDATE No action ON DELETE No action;
ALTER TABLE DayAheadTotalLoadForecast ADD CONSTRAINT FK_DayAheadTotalLoadForecast_ResolutionCode_ResolutionCodeId FOREIGN KEY (ResolutionCodeId) REFERENCES ResolutionCode (Id) ON UPDATE No action ON DELETE No action;
