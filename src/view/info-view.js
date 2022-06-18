import AbstractView from '../framework/view/abstract-view.js';
import { getAvailableOffers, isMonthEqual } from '../utils/point.js';
import dayjs from 'dayjs';


const MAX_POINTS_QUANTITY_TO_DISPLAY_MIDDLE = 3;
const MIDDLE_OF_THREE = 1 ;

const createInfoTemplate = (filteredPoints, allOffers) => {

  if (filteredPoints === null || ((Object.keys(filteredPoints)).length === 0 )) {
    return '<section></section>';
  }

  const firstPoint = filteredPoints[0];
  const lastPoint = filteredPoints[filteredPoints.length-1];
  const firstDestination = firstPoint.destination.name;
  const firstDateFrom= dayjs(firstPoint.dateFrom).format('MMM DD');
  const lastDestination = lastPoint.destination.name;
  let lastDateTo =  dayjs(lastPoint.dateTo).format('MMM DD');
  lastDateTo= isMonthEqual(firstDateFrom, lastDateTo) ? dayjs(lastPoint.dateTo).format('DD') : dayjs(lastPoint.dateTo).format('MMM DD');


  const calculateAllExtraCharges = () => {
    const extraChargesAllPoints =[];
    filteredPoints.map((point) => {
      const availableOffers = getAvailableOffers(point.type, allOffers);
      const extraChargesEachPoint = availableOffers.filter((item) => point.offers.includes(item.id)).map((item) => item.price);
      const totalSumEachPoint = extraChargesEachPoint.reduce((sum, current) => sum + current, 0);
      extraChargesAllPoints.push(totalSumEachPoint);
    }
    );
    return extraChargesAllPoints;
  };

  const allExtraChargesAllPoints = calculateAllExtraCharges();
  let totalExtraChargesAllPoints = allExtraChargesAllPoints.reduce((sum, current) => sum + current, 0);
  if (totalExtraChargesAllPoints === null ) {
    totalExtraChargesAllPoints = 0;
  }


  const calculatePointsBasePrices = () => filteredPoints.map((point) => +(point.basePrice)).reduce((sum, current) => sum + current, 0);


  let totalBasePricesSum = calculatePointsBasePrices();
  if (totalBasePricesSum === null ) {
    totalBasePricesSum = 0;
  }


  const findMiddleDestination = () => {
    if (filteredPoints.length === MAX_POINTS_QUANTITY_TO_DISPLAY_MIDDLE) {
      return  filteredPoints[MIDDLE_OF_THREE].destination.name;
    }
    return '...';
  };

  const middleDestination = findMiddleDestination();

  const tripValue = totalBasePricesSum +  totalExtraChargesAllPoints;

  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${firstDestination} &mdash; ${middleDestination} &mdash; ${lastDestination}</h1>

              <p class="trip-info__dates">${firstDateFrom}&nbsp;&mdash;&nbsp;${lastDateTo}</p>
              </div>

              <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripValue}</span>
              </p>
            </section>`
  );
};

export default class InfoView extends AbstractView{

  #filteredPoints = null;
  #allOffers = null;

  constructor (filteredPoints, allOffers) {
    super();
    this.#filteredPoints = filteredPoints;
    this.#allOffers = allOffers;
  }

  get template() {
    return createInfoTemplate(this.#filteredPoints, this.#allOffers);
  }
}
