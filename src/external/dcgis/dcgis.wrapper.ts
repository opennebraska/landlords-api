import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../../properties/dto/create.property.dto';

class DcgisProperty {
  OBJECTID: number;
  PIN: string;
  OWNER_NAME: string;
  ADDRESS1: string;
  ADDRESS2: string;
  OWNER_CITY: string;
  OWNER_STAT: string;
  OWNER_ZIP: string;
  PROPERTY_A: string;
  HOUSE: string;
  STREET_DIR: string;
  STREET_NAM: string;
  STREET_TYP: string;
  APARTMENT: string;
  PROP_CITY: string;
  PROP_ZIP: string;
  SEC_TWN_RN: string;
  ADDITION_N: string;
  BLOCK: string;
  LOT: string;
  LEGAL1: string;
  LEGAL2: string;
  LEGAL3: string;
  LEGAL4: string;
  DCAACCTYPE: string;
  QUALITY: string;
  CONDITION: string;
  SQ_FEET: string;
  ASSESSOR: string;
  TREASURER: string;
  X_COORD: string;
  Y_COORD: string;
  ADDRESS_LA: string;
  TAX_DIST: string;
  SHAPESTArea: string;
}

@Injectable()
export class DcgisWrapper {
  private static FIELDS =
    'OBJECTID,PIN,OWNER_NAME,ADDRESS1,ADDRESS2,OWNER_CITY,OWNER_STAT,OWNER_ZIP,PROPERTY_A,HOUSE,APARTMENT,PROP_CITY,PROP_ZIP,BLOCK,LOT,QUALITY,CONDITION,ADDRESS_LA,X_COORD,Y_COORD';
  private static WHERE = '1=1';
  private static PAGE_SIZE_DEFAULT = 1000;

  static convertPropertyJsonToEntity(
    property: DcgisProperty,
  ): CreatePropertyDto {
    const propertyDto = new CreatePropertyDto();
    propertyDto.id = null;
    propertyDto.time = `${new Date()}`;
    propertyDto.objectId = property.OBJECTID;
    propertyDto.pin = property.PIN;
    propertyDto.ownerName = property.OWNER_NAME;
    propertyDto.address1 = property.ADDRESS1;
    propertyDto.address2 = property.ADDRESS2;
    propertyDto.ownerCity = property.OWNER_CITY;
    propertyDto.ownerState = property.OWNER_STAT;
    propertyDto.ownerZip = property.OWNER_ZIP;
    propertyDto.propertyA = property.PROPERTY_A;
    propertyDto.house = property.HOUSE;
    propertyDto.streetDirection = property.STREET_DIR;
    propertyDto.streetName = property.STREET_NAM;
    propertyDto.streetType = property.STREET_TYP;
    propertyDto.apartment = property.APARTMENT;
    propertyDto.propertyCity = property.PROP_CITY;
    propertyDto.propertyZip = property.PROP_ZIP;
    propertyDto.secTwnRn = property.SEC_TWN_RN;
    propertyDto.additionN = property.ADDITION_N;
    propertyDto.block = property.BLOCK;
    propertyDto.lot = property.LOT;
    propertyDto.legal1 = property.LEGAL1;
    propertyDto.legal2 = property.LEGAL2;
    propertyDto.legal3 = property.LEGAL3;
    propertyDto.legal4 = property.LEGAL4;
    propertyDto.dcaaccType = property.DCAACCTYPE;
    propertyDto.class = null;
    propertyDto.quality = property.QUALITY;
    propertyDto.condition = property.CONDITION;
    propertyDto.sqFeet = property.SQ_FEET;
    propertyDto.assessor = property.ASSESSOR;
    propertyDto.treasurer = property.TREASURER;
    propertyDto.xCoord = property.X_COORD;
    propertyDto.yCoord = property.Y_COORD;
    propertyDto.addressLA = property.ADDRESS_LA;
    propertyDto.taxDist = property.TAX_DIST;
    propertyDto.shapeArea = property.SHAPESTArea;
    propertyDto.violationCount = null;
    propertyDto.openViolationCount = null;
    propertyDto.userId = null;
    return propertyDto;
  }

  async retrieveProperties(): Promise<CreatePropertyDto[]> {
    const parcelsCount = await this.getParcelsCount();
    console.log(`Requesting ${parcelsCount} parcels.`);

    return this.makeDataRequests(parcelsCount, DcgisWrapper.PAGE_SIZE_DEFAULT);
  }

  private async getParcelsCount(): Promise<number> {
    const url = `https://gis.dogis.org/arcgis/rest/services/OpenData_Layers/MapServer/38/query?where=${DcgisWrapper.WHERE}&returnCountOnly=true&f=json`;
    console.log(`Fetching data count from ${url}`);
    const parcelsCountResponse = await axios.get(url);
    const count = Number.parseInt(parcelsCountResponse?.data?.count);
    if (!count) {
      throw new Error('Parcel count query returned no count.');
    }
    return count;
  }

  private getParcelsUrl = (resultOffset, resultRecordCount) =>
    `https://gis.dogis.org/arcgis/rest/services/OpenData_Layers/MapServer/38/query?where=${DcgisWrapper.WHERE}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=${DcgisWrapper.FIELDS}&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&having=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}&queryByDistance=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=json`;

  private async getParcels(page, pageSize) {
    const pageUrl = this.getParcelsUrl(page, pageSize);
    const parcelsFeaturesResponse = await axios.get(pageUrl);
    const parcelsFeatures = parcelsFeaturesResponse.data;
    return parcelsFeatures.features;
  }

  private async makeDataRequests(
    count,
    pageSize,
  ): Promise<CreatePropertyDto[]> {
    if (pageSize <= 0) {
      console.warn('Page size should be greater than 0.');
      return [];
    }

    const parcels = [];
    let countOffset = 0;
    while (countOffset < count) {
      console.log(countOffset);
      const pageParcels = await this.getParcels(countOffset, pageSize);
      parcels.push(
        ...pageParcels.map(pageParcel => {
          if (pageParcel.attributes) {
            return DcgisWrapper.convertPropertyJsonToEntity(
              pageParcel.attributes,
            );
          }
        }),
      );
      countOffset += pageParcels.length;
    }
    return parcels;
  }
}
