import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { extend, loadCldr, setCulture, Internationalization, L10n } from '@syncfusion/ej2-base';
import {EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,AgendaService, ScheduleComponent, View,ResizeService, DragAndDropService} from '@syncfusion/ej2-angular-schedule';
setCulture('fr');

declare let require: Function;
@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService,ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class AgendaComponent implements OnInit {

  public selectedDate: Date = new Date(2021, 1, 8);
  public data: object [] = [{
    Id: 2,
    EventName: 'Meeting',
    StartTime: new Date(2018, 1, 15, 10, 0),
    EndTime: new Date(2018, 1, 15, 12, 30),
    IsAllDay: false
  }];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    fields: {
      id: 'Id',
      subject: { name: 'EventName' },
      isAllDay: { name: 'IsAllDay' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    }
  };
  public currentView: View = 'Month';
  public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
    constructor(private ngEle: ElementRef) {
      loadCldr(
        require('../../../../node_modules/cldr-data/supplemental/numberingSystems.json'),
        require('../../../../node_modules/cldr-data/main/fr/ca-gregorian.json'),
        require('../../../../node_modules/cldr-data/main/fr/currencies.json'),
        require('../../../../node_modules/cldr-data/main/fr/numbers.json'),
        require('../../../../node_modules/cldr-data/main/fr/timeZoneNames.json')
      );
      L10n.load({
        'fr': {
            'schedule': {
               "day": "journée",
              "week": "La semaine",
              "workWeek": "Semaine de travail",
              "month": "Mois",
              "agenda": "Ordre du jour",
              "weekAgenda": "Agenda de la semaine",
              "workWeekAgenda": "Agenda de la semaine de travail",
              "monthAgenda": "Agenda du mois",
              "today": "Aujourd'hui",
              "noEvents": "Pas d'événements",
              "emptyContainer": "Aucun événement n'est prévu ce jour-là.",
              "allDay": "Toute la journée",
              "start": "Début",
              "end": "Fin",
              "more": "plus",
              "close": "Fermer",
              "cancel": "Annuler",
              "noTitle": "(Pas de titre)",
              "delete": "Effacer",
              "deleteEvent": "Supprimer un événement",
              "deleteMultipleEvent": "Supprimer plusieurs événements",
              "selectedItems": "Articles sélectionnés",
              "deleteSeries": "Supprimer la série",
              "edit": "modifier",
              "editSeries": "Modifier la série",
              "editEvent": "Modifier l'événement",
              "createEvent": "Créer",
              "subject": "Assujettir",
              "addTitle": "Ajouter un titre",
              "moreDetails": "Plus de détails",
              "save": "sauvegarder",
              "editContent": "Voulez-vous modifier uniquement cet événement ou une série entière?",
              "deleteRecurrenceContent": "Voulez-vous supprimer uniquement cet événement ou une série entière?",
              "deleteContent": "Êtes-vous sûr de vouloir supprimer cet événement?",
              "deleteMultipleContent": "Êtes-vous sûr de vouloir supprimer les événements sélectionnés?",
              "newEvent": "Nouvel évènement",
              "title": "Titre",
              "location": "Emplacement",
              "description": "La description",
              "timezone": "Fuseau horaire",
              "startTimezone": "Début du fuseau horaire",
              "endTimezone": "Fin du fuseau horaire",
              "repeat": "Répéter",
              "saveButton": "sauvegarder",
              "cancelButton": "Annuler",
              "deleteButton": "Effacer",
              "recurrence": "Récurrence",
              "wrongPattern": "Le modèle de récurrence n'est pas valide.",
              "seriesChangeAlert": "Les modifications apportées à des instances spécifiques de cette série seront annulées et ces événements correspondront à nouveau à la série.",
              "createError": "La durée de l'événement doit être plus courte que sa fréquence. Raccourcissez la durée ou modifiez le modèle de récurrence dans l'éditeur d'événement de récurrence.",
              "recurrenceDateValidation": "Certains mois ont moins que la date sélectionnée. Pour ces mois, l'événement se produira à la dernière date du mois.",
              "sameDayAlert": "Deux occurrences du même événement ne peuvent pas se produire le même jour.",
              "editRecurrence": "Modifier la récurrence",
              "repeats": "Répète",
              "alert": "Alerte",
              "startEndError": "La date de fin sélectionnée se produit avant la date de début.",
              "invalidDateError": "La valeur de date saisie est invalide.",
              "ok": "D'accord",
              "occurrence": "Occurrence",
              "series": "Séries",
              "previous": "précédent",
              "next": "Prochain",
              "timelineDay": "Journée chronologique",
              "timelineWeek": "Semaine chronologique",
              "timelineWorkWeek": "Semaine de travail chronologique",
              "timelineMonth": "Mois de la chronologie"
          },
          "recurrenceeditor": {
              "none": "Aucun",
              "daily": "du quotidien",
              "weekly": "Hebdomadaire",
              "monthly": "Mensuel",
              "month": "Mois",
              "yearly": "Annuel",
              "never": "Jamais",
              "until": "Jusqu'à",
              "count": "Compter",
              "first": "Premier",
              "second": "Seconde",
              "third": "Troisième",
              "fourth": "Quatrième",
              "last": "Dernier",
              "repeat": "Répéter",
              "repeatEvery": "Répéter tous les",
              "on": "Répéter sur",
              "end": "Fin",
              "onDay": "journée",
              "days": "Journées)",
              "weeks": "Semaines)",
              "months": "Mois)",
              "years": "Années)",
              "every": "chaque",
              "summaryTimes": "fois)",
              "summaryOn": "sur",
              "summaryUntil": "jusqu'à",
              "summaryRepeat": "Répète",
              "summaryDay": "journées)",
              "summaryWeek": "semaines)",
              "summaryMonth": "mois)",
              "summaryYear": "années)",
              "monthWeek": "Mois Semaine",
              "monthPosition": "Position du mois",
              "monthExpander": "Mois Expander",
              "yearExpander": "Année Expander",
              "repeatInterval": "Intervalle de répétition"
  
          }
        }
    });
    }
  
    ngOnInit(): void {
    }

}
