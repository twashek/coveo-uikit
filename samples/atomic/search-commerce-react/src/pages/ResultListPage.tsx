//import {AtomicResultLink, AtomicResultList} from '@coveo/atomic-react';
//import {AtomicResultSectionVisual, AtomicResultSectionVisual} from '@coveo/atomic-react';
import {
  AtomicFoldedResultList,
  AtomicFormatCurrency,
  AtomicResult,
  AtomicResultBadge,
  AtomicResultDate,
  AtomicResultFieldsList,
  AtomicResultImage,
  AtomicResultLink,
  AtomicResultList,
  AtomicResultMultiValueText,
  AtomicResultNumber,
  AtomicResultPrintableUri,
  AtomicResultRating,
  AtomicResultSectionBadges,
  AtomicResultSectionBottomMetadata,
  AtomicResultSectionChildren,
  AtomicResultSectionEmphasized,
  AtomicResultSectionExcerpt,
  AtomicResultSectionTitle,
  AtomicResultSectionTitleMetadata,
  AtomicResultSectionVisual,
  AtomicResultText,
  AtomicText,
} from '@coveo/atomic-react';
import type {FunctionComponent} from 'react';
import {AtomicPageWrapper} from '../components/AtomicPageWrapper';
import {Result} from '@coveo/headless';

export const ResultListPage: FunctionComponent = () => {
  return (
    <AtomicPageWrapper sample="electronics">
      <AtomicResultList
        display="grid"
        imageSize="small"
        density="comfortable"
        template={MyTemplate}
      />
    </AtomicPageWrapper>
  );
};

function MyTemplate(result: Result) {
  return (
    <>
      <style>{`
        .result-title { font-size: 1.5rem; color: #333; }
        .field {display: inline-block; align-items: center;}
        .field-label {font-weight: bold; margin-right: 0.25rem;}
      `}</style>

      <AtomicResultSectionVisual className="poke-border">
        <AtomicResultImage
          field="pokemon_image"
          fallback="https://picsum.photos/seed/picsum/200"
        />
      </AtomicResultSectionVisual>

      <AtomicResultSectionTitle>
        <AtomicResultLink className="result-title">
          <AtomicResultText field="pokemon_name" className="result-title" />
        </AtomicResultLink>
      </AtomicResultSectionTitle>

      {/* Put your Types here */}
      <AtomicResultSectionTitleMetadata>
        <div className="field">
          <span className="field-label">Types:</span>
          <AtomicResultMultiValueText field="pokemon_types" />
        </div>
      </AtomicResultSectionTitleMetadata>

      {/* Your pokedex description */}
      <AtomicResultSectionExcerpt>
        {/* We check if the field exists and is a string, then render it as real HTML */}
        {typeof result.raw.pokemon_desc === 'string' && (
          <div
            dangerouslySetInnerHTML={{
              __html: result.raw.pokemon_desc.replace(/\/p>;<p/g, '/p><p'),
            }}
          />
        )}
      </AtomicResultSectionExcerpt>

      <AtomicResultSectionBottomMetadata></AtomicResultSectionBottomMetadata>
    </>
  );
}

function MyTemplateOld(result: Result) {
  return (
    <>
      <style>{`
         .field {
           display: inline-flex;
           align-items: center;
         }

         .field-label {
           font-weight: bold;
           margin-right: 0.25rem;
         }
       `}</style>
      <AtomicResultSectionVisual>
        <AtomicResultImage field="pokemon_image" />
      </AtomicResultSectionVisual>
      <AtomicResultSectionTitle>
        <AtomicResultLink></AtomicResultLink>
      </AtomicResultSectionTitle>

      <AtomicResultSectionTitleMetadata>
        <AtomicResultRating field="ec_rating" />
        <AtomicResultPrintableUri maxNumberOfParts={3} />
      </AtomicResultSectionTitleMetadata>
      <AtomicResultSectionEmphasized>
        <AtomicResultNumber field="ec_price">
          <AtomicFormatCurrency currency="USD" />
        </AtomicResultNumber>
      </AtomicResultSectionEmphasized>
      <AtomicResultSectionExcerpt></AtomicResultSectionExcerpt>
      <AtomicResultSectionBottomMetadata></AtomicResultSectionBottomMetadata>
    </>
  );
}
