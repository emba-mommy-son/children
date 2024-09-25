import {create} from 'zustand';
import {Realm} from 'realm';

export interface ISentiment {
  id: Realm.BSON.ObjectId;
  original: string;
  translated: string;
  sentiment: SentimentType;
  mixedScore: number;
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
  createdAt: Date;
}

export interface ISentimentCreateProps {
  original: string;
  translated: string;
  sentiment: SentimentType;
  mixedScore: number;
  positiveScore: number;
  negativeScore: number;
  neutralScore: number;
}

export enum SentimentType {
  POSITIVE = 'POSITIVE',
  NEGATIVE = 'NEGATIVE',
  NEUTRAL = 'NEUTRAL',
  MIXED = 'MIXED',
}

export class Sentiment extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  original!: string;
  translated!: string;
  sentiment!: SentimentType;
  neutralScore!: number;
  positiveScore!: number;
  negativeScore!: number;
  mixedScore!: number;
  createdAt!: Date;

  static create = (props: ISentimentCreateProps): ISentiment => {
    const {
      original,
      translated,
      sentiment,
      neutralScore,
      positiveScore,
      negativeScore,
      mixedScore,
    } = props;

    return {
      id: new Realm.BSON.ObjectId(),
      original,
      translated,
      sentiment,
      neutralScore,
      positiveScore,
      negativeScore,
      mixedScore,
      createdAt: new Date(),
    };
  };

  public static schema: Realm.ObjectSchema = {
    name: 'Sentiment',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      original: 'string',
      translated: 'string',
      sentiment: 'string',
      neutralScore: 'float',
      positiveScore: 'float',
      negativeScore: 'float',
      mixedScore: 'float',
      createdAt: 'date',
    },
  };
}
